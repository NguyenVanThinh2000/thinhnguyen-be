export type TGestDto = {
  id: string
  name: string
  nameInInvatation: string
  isAttending: boolean | null
  wishes?: string
}

export type TWishesListResponseDto = {
  guests: TGestDto[]
}

export type THost = 'thoan' | 'thinh'

export type TGuestsQueryParams = {
  host: THost[]
  keyword: string
}
