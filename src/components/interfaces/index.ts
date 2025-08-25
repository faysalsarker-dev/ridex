export interface Testimonial {
  id: number;
  name: string;
  image: string;
  rating: number;
  message: string;
  location: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}


export interface Ride {
  _id: string;
  createdAt: string;
  updatedAt: string;
  status:
    | "requested"
    | "accepted"
    | "picked_up"
    | "in_transit"
    | "completed"
    | "cancelled_by_rider"
    | "cancelled_by_driver";
  fare: number;
  pickupLocation: {
    address: string;
    lat: number;
    lng: number;
  };
  destinationLocation: {
    address: string;
    lat: number;
    lng: number;
  };
  rider: {
    name: string;
    email: string;
     _id: string;
  };
  driver:  {
    name: string;
    email: string;
     _id: string;
  };
  passengers?: number;
  notes?: string;
  userRating?: number;
  driverRating?: number;
  rideTimeline?: {
    requestedAt?: string;
    acceptedAt?: string;
    pickedUpAt?: string;
    inTransitAt?: string;
    completedAt?: string;
  };
}

export interface FormData {
    passengers: string;
    notes: string;
  }


export type UserRole = 'admin' | 'rider' | 'driver';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isBlocked: boolean;
    driverProfile?: {
    isApproved?: boolean;
    isOnline?: boolean;
    vehicleInfo?: {
      model?: string;
      licensePlate?: string;
      color?: string;
    };
  }
  updatedAt: string;

}

export  type DriverFormData = {
    vehicleModel: string;
    licensePlate: string;
    vehicleColor: string;
  };

  export type ApiError = { data?: { message?: string }; message?: string };