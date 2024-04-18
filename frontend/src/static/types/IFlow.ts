export interface IFlow {
  "info_ngpt": IFlowType,
  "info_suburban_trains": IFlowType,
  "info_taxi": IFlowType,
  "info_carsharing": IFlowType,
  "info_electrosuda": IFlowType,
  "info_metro": IFlowType,
  "info_personal": IFlowType,
}

export interface IFlowType {
  "yesterday": number,
  "2weeks_ago": number,
  "deviation": number
}