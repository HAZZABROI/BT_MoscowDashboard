export interface IVehicle {
  date: {
    date: string,
    time: string,
  },
  unic_count: number,
  nearest: [
    {
      date: {
        date: string,
        time: string,
      },
      count: number,
    }
  ]
  trend: 'up' | 'down',
  infoTaxi: IVehicleType,
  infoCarsharing: IVehicleType,
  infoNGPT: IVehicleType
}

interface IVehicleType {
  date: {
    date: string,
    time: string,
  },
  count: number,
  trend: 'down' | 'up',
  deviation_appn_count: number,
  deviation_appg_count: number,
}