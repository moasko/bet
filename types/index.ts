// users type

import {
  LeagueStatus,
  PaymentStatus,
  PaymentType,
  UserRols,
  UserStatus,
} from "@prisma/client";

export interface UserType {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: UserStatus;
  role: UserRols;
  password: string;
  permissions: Permissions[];
  referalCode: string;
  parainCode: string;
  emailVerified: boolean;
  mobileVerified: boolean;
  referredById?: number;
  statuts: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export type Permissions = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type userRegister = {
  name: string;
  phone: string;
  email: string;
  password: string;
  parainCode: string;
};

export type Match = {
  id: string;
  league: {
    name: string;
  };
  homeTeam: {
    flag: string;
    shortName: string;
    name: string;
    type: string;
  };
  awayTeam: {
    flag: string;
    shortName: string;
    name: string;
    type: string;
  };
  result: string;
  percentage: number;
  matchStartTime: string;
};

export type League = {
  id: number;
  name: string;
  slug: string;
  flag: string;
  status: LeagueStatus;
  matches: Match[];
  createdAt: Date;
};

export type MatchListProps = {
  matches?: Match[];
  isLoading: boolean;
};

export interface Payment {
  id: number;
  userId: number;
  amount: number;
  fee: number;
  type: PaymentType;
  status: PaymentStatus;
  createdAt: string;
}

export interface Notification {
  id: number;
  userId?: number;
  title?: string;
  message: string;
  type: NotificationType;
  createdAt: string;
}

export enum NotificationType {
  CREDIT = "CREDIT",
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
}

export interface NavLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}
