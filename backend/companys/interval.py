import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

data = pd.read_csv('/content/drive/MyDrive/Colab Notebooks/MISSING_INTERVALS.csv')  # origianl csv loaded from db


# Merge date and  time
def merge_date_time(df):
    df['Interval'] = df['Interval'] + ' ' + df['IntervalStartTime']
    df['Interval'] = pd.to_datetime(df['Interval'])
    df = df.drop(columns=['IntervalStartTime'])
    return df


# Interval: Data frame with continuous date and time and added null intervals
def Check_Continuity_of_date_time(df):
    dates = pd.Index(df['Interval'])
    Usage_list = df['Usage']
    Usage = Usage_list.values.tolist()
    df_Series = pd.Series(Usage, dates)
    df_Series = df_Series.asfreq(freq='900S')
    Complete_df = df_Series.to_frame()
    Complete_df = Complete_df.rename(columns={0: "Usage"})  # When converted to series usage col name is 0

    return Complete_df


def Add_Type(df):
    for ind in df.index:
        if pd.isnull(df.loc[ind, 'Usage']):
            df.loc[ind, 'Type'] = 'Simulated'
        else:
            df.loc[ind, 'Type'] = 'Provided'
    return df


# Transform from vertical to horizontal series
def transform_to_15min_cols(series):
    df = pd.DataFrame()
    series = series.fillna(
        'x')  # during the horizontal conversion null values are converted to 0s; so null = x and after conversion null again
    start = series.index.min()
    end = series.index.max()

    df['year'] = series.index.year
    df['month'] = series.index.month
    df['day'] = series.index.day
    df['time'] = series.index.time
    df['Usage'] = series.values

    df = df.set_index(['year', 'month', 'day', 'time'], append=True).unstack()
    df = df.groupby(['year', 'month', 'day']).sum()

    df.reset_index(inplace=True)
    df.drop(['year', 'month', 'day'], axis=1, inplace=True)

    date_list = pd.date_range(start=start, end=end, freq='D').strftime('%Y-%m-%d')

    df.index = pd.DatetimeIndex(date_list, name='date')
    df = df.replace(['x'], np.nan)
    return df


def Interpolate_fun(df):
    df = merge_date_time(df)

    Complete_data = Check_Continuity_of_date_time(df)

    interval_HZ = transform_to_15min_cols(Complete_data['Usage'])

    Complete_data = Add_Type(Complete_data)

    interval_HZ = interval_HZ.interpolate(method='linear', axis=0)  # Avg of previous and next available day's same time

    stack_df = pd.DataFrame(interval_HZ).stack()
    Complete_data['Usage'] = stack_df.values

    return Complete_data


Intervals = Interpolate_fun(data)
Intervals  # Override this data in load data csv
