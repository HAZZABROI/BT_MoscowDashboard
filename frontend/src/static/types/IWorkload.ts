export interface IWorkload {
    date: {
      date: string,
      time: string,
    },
    score: number,
    nearest: [
      {
        date: {
          date: string,
          time: string,
        },
        score: number
      }
    ],
    lenght_jam: number,
    trend_jam: 'up' | 'down',
    trend_time: 'up' | 'down',
    deviation_appn_jam: number,
    deviation_appg_jam: number,
    driving_time_min: number,
    deviation_appn_driving: number,
    deviation_appg_driving: number,
    top_list: [
      {
        date: {
          date: string,
          time: string,
        },
        nameHW: string,
        direction: 'из центра' | 'в центр' | 'внешняя' | 'внутренняя',
        top: number,
      }
    ]
}