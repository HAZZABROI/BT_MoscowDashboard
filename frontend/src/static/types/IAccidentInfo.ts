export interface IAccidentInfo {
  count: number,
  trend: 'up' | 'down' | 'no_diff',
  deviation_appn_count: number,
  deviation_appg_count: number,
}

export interface IAccidentDie {
  date_from: {
    date: string,
    time: string,
  },
  count: number,
}

export interface IAccident {
  time: {
    time: string,
    date: string,
  },
  describtion: string,
  adress: string,
  time_gubdd: number,
}