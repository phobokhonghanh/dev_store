export interface NavRoute {
  label: string;
  href: string;
  icon?: any;
  opened?: boolean;
  children?: NavRoute[];
}
