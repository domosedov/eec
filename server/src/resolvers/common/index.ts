import { CityResolver } from './City'
import { MetroResolver } from './Metro'
import { StatusResolver } from './Status'
import { StudentResolver } from './Student'
import { SubjectResolver } from './Subject'
import { MarkResolver } from './Mark'
import { PlaceResolver } from './Place'

export default [CityResolver, MetroResolver, StudentResolver, SubjectResolver, StatusResolver, MarkResolver, PlaceResolver] as const
