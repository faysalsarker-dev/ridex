export interface VehicleInfo {
  model?: string;
  licensePlate?: string;
  color?: string;
}

export interface DriverProfile {
  isApproved: boolean;
  isOnline: boolean;
  vehicleInfo?: VehicleInfo;
  phoneNumber?: string;
  driverLicenseNumber?: string;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role: 'rider' | 'driver' | 'admin';
  isBlocked: boolean;
  driverProfile?: DriverProfile;
  rating?: number;
  totalRides?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserFormData {
  name: string;
  email: string;
}

export interface DriverFormData {
  vehicleModel: string;
  licensePlate: string;
  vehicleColor: string;
}

export interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
