import { FC } from 'react';
import Menu, { MenuProps } from './menu'
import SubMenu, { SubMenuProps } from './subMenu'
import MenuItem, { MenuItemProps } from './menuItem'

export type ImenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>;
  SubMenu: FC<SubMenuProps>;
};

const TransMenu = Menu as ImenuComponent;

TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu;
