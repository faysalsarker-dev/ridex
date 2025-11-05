export interface User {
  id: string;
  name: string;
  email: string;
  role: 'rider' | 'driver';
  status: 'active' | 'blocked' | 'pending' | 'suspended';
  joinDate: string;
  totalRides: number;
  rating: number;
  avatar?: string;
}

export interface Ride {
  id: string;
  riderId: string;
  riderName: string;
  driverId: string;
  driverName: string;
  pickup: string;
  destination: string;
  status: 'completed' | 'ongoing' | 'cancelled' | 'scheduled';
  date: string;
  fare: number;
  distance: number;
  rating?: number;
}

export interface AnalyticsData {
  date: string;
  rides: number;
  revenue: number;
  activeDrivers: number;
}

export const mockUsers: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'rider', status: 'active', joinDate: '2024-01-15', totalRides: 47, rating: 4.8 },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'driver', status: 'active', joinDate: '2023-11-20', totalRides: 312, rating: 4.9 },
  { id: '3', name: 'Carol White', email: 'carol@example.com', role: 'rider', status: 'active', joinDate: '2024-02-10', totalRides: 23, rating: 4.5 },
  { id: '4', name: 'David Brown', email: 'david@example.com', role: 'driver', status: 'pending', joinDate: '2024-03-01', totalRides: 0, rating: 0 },
  { id: '5', name: 'Emma Davis', email: 'emma@example.com', role: 'rider', status: 'blocked', joinDate: '2024-01-05', totalRides: 15, rating: 3.2 },
  { id: '6', name: 'Frank Miller', email: 'frank@example.com', role: 'driver', status: 'suspended', joinDate: '2023-12-15', totalRides: 89, rating: 3.8 },
  { id: '7', name: 'Grace Lee', email: 'grace@example.com', role: 'rider', status: 'active', joinDate: '2024-02-20', totalRides: 56, rating: 4.9 },
  { id: '8', name: 'Henry Wilson', email: 'henry@example.com', role: 'driver', status: 'active', joinDate: '2023-10-10', totalRides: 445, rating: 4.7 },
];

export const mockRides: Ride[] = [
  { id: 'R001', riderId: '1', riderName: 'Alice Johnson', driverId: '2', driverName: 'Bob Smith', pickup: '123 Main St', destination: '456 Oak Ave', status: 'completed', date: '2024-03-15T10:30:00', fare: 25.50, distance: 8.3, rating: 5 },
  { id: 'R002', riderId: '3', riderName: 'Carol White', driverId: '8', driverName: 'Henry Wilson', pickup: '789 Elm St', destination: '321 Pine Rd', status: 'ongoing', date: '2024-03-16T14:15:00', fare: 18.75, distance: 5.7 },
  { id: 'R003', riderId: '7', riderName: 'Grace Lee', driverId: '2', driverName: 'Bob Smith', pickup: '555 Maple Dr', destination: '777 Birch Ln', status: 'completed', date: '2024-03-16T09:00:00', fare: 32.00, distance: 12.1, rating: 4 },
  { id: 'R004', riderId: '1', riderName: 'Alice Johnson', driverId: '8', driverName: 'Henry Wilson', pickup: '888 Cedar St', destination: '999 Willow Way', status: 'cancelled', date: '2024-03-14T16:45:00', fare: 0, distance: 0 },
  { id: 'R005', riderId: '3', riderName: 'Carol White', driverId: '2', driverName: 'Bob Smith', pickup: '111 Spruce Ave', destination: '222 Ash Blvd', status: 'scheduled', date: '2024-03-17T08:00:00', fare: 28.50, distance: 9.5 },
  { id: 'R006', riderId: '7', riderName: 'Grace Lee', driverId: '8', driverName: 'Henry Wilson', pickup: '333 Fir St', destination: '444 Poplar Dr', status: 'completed', date: '2024-03-15T18:20:00', fare: 41.25, distance: 15.8, rating: 5 },
];

export const mockAnalytics: AnalyticsData[] = [
  { date: '2024-03-10', rides: 145, revenue: 3625, activeDrivers: 42 },
  { date: '2024-03-11', rides: 167, revenue: 4175, activeDrivers: 45 },
  { date: '2024-03-12', rides: 189, revenue: 4725, activeDrivers: 48 },
  { date: '2024-03-13', rides: 178, revenue: 4450, activeDrivers: 46 },
  { date: '2024-03-14', rides: 203, revenue: 5075, activeDrivers: 51 },
  { date: '2024-03-15', rides: 221, revenue: 5525, activeDrivers: 53 },
  { date: '2024-03-16', rides: 198, revenue: 4950, activeDrivers: 49 },
];
