export interface IRepair {
  date: {
    date: string,
    time: string,
  },
  unknownWorksList: [
    {
      date: {
        date: string,
        time: string,
      },
      count: number,
      deviation_appn_count: number,
      deviation_appg_count: number,
    }
  ],
  approvedWorkList: [
    {
      date: {
        date: string,
        time: string,
      },
      count: number,
      deviation_appn_count: number,
      deviation_appg_count: number,
    }
  ]
}