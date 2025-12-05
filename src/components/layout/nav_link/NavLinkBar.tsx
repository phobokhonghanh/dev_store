import { Badge, NavLink } from '@mantine/core';
import { IconHome2, IconGauge, IconChevronRight, IconActivity, IconCircleOff, IconFingerprint, IconFreeRights, IconFireExtinguisher, Icon360View, IconMoodSmile } from '@tabler/icons-react';

export function NavLinkBar() {
  return (
    <>
      <NavLink
        href="#required-for-focus"
        label="With icon"
        leftSection={<IconHome2 size={16} stroke={1.5} />}
      />
       <NavLink
        href="#required-for-focus"
        label="Premium"
        leftSection={<IconFingerprint size={16} stroke={1.5} />}
        childrenOffset={28}
      >
        <NavLink href="#required-for-focus" label="First tools" />
        <NavLink label="Second tools" href="#required-for-focus" />
        <NavLink label="Premium parent" childrenOffset={28} href="#required-for-focus">
          <NavLink label="First tools" href="#required-for-focus" />
          <NavLink label="Second tools" href="#required-for-focus" />
          <NavLink label="Third tools" href="#required-for-focus" />
        </NavLink>
      </NavLink>

      <NavLink
        href="#required-for-focus"
        label="Free"
        leftSection={<IconMoodSmile size={16} stroke={1.5} />}
        childrenOffset={28}
        defaultOpened
      >
        <NavLink label="First tools" href="#required-for-focus" />
        <NavLink label="Second tools" href="#required-for-focus" />
        <NavLink label="Third tools" href="#required-for-focus" />
      </NavLink>
    </>
  );
}