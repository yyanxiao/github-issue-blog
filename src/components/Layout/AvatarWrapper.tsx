'use client';

import { Avatar } from "@heroui/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { logOut } from '@/actions/auth';
import { User } from '@/types';

export default function AvatarWrapper({ user }: { user: User | null }) {
  if (!user) {
    return null;
  }

  return (
    <Dropdown radius="sm" placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          name={user.name ?? undefined}
          size="sm"
          src={user.avatar_url}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem
          key="profile"
          className="h-14 gap-2"
          textValue={`Signed in as ${user.name}`}
        >
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user.name}</p>
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          onPress={async () => {
            await logOut();
          }}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
