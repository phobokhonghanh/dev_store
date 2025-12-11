import React from 'react';

export type NavRoute = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  opened?: boolean;
  children?: NavRoute[];
};

export type RawNav = {
  label: string;
  slug: string;
  icon?: React.ReactNode;
  opened?: boolean;
  children?: RawNav[];
};