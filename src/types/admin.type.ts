export interface ICreateBusPayLoad
{
  car_no: number;
  seat_capacity: number;
  seat_no: string[];
}

export interface ICreateBusSchedulePayLoad
{
    bus_id: number;
    depart_time: Date;
    est_arrival_time: Date;
    per_seat_cost: number;
}
