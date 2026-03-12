import React from 'react';

import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';
import * as Fa6Icons from 'react-icons/fa6';
import * as IoIcons from 'react-icons/io5';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import * as FiIcons from 'react-icons/fi';
import * as GiIcons from 'react-icons/gi';
import * as HiIcons from 'react-icons/hi2';
import * as RiIcons from 'react-icons/ri';
import * as TbIcons from 'react-icons/tb';
import * as CiIcons from 'react-icons/ci';
import * as SiIcons from 'react-icons/si';

type IconProps = {
  type: string;
  name: string;
  size?: number;
  color?: string;
  className?: string;
};

const getIconSet = (type: string) => {
  switch (type) {
    case 'material':
      return MdIcons;
    case 'fa':
      return FaIcons;
    case 'fa6':
      return Fa6Icons;
    case 'ion':
      return IoIcons;
    case 'ant':
      return AiIcons;
    case 'bootstrap':
      return BiIcons;
    case 'feather':
      return FiIcons;
    case 'game':
      return GiIcons;
    case 'hero':
      return HiIcons;
    case 'remix':
      return RiIcons;
    case 'tabler':
      return TbIcons;
    case 'circum':
      return CiIcons;
    case 'simple':
      return SiIcons;
    default:
      return FaIcons;
  }
};

const Icon: React.FC<IconProps> = ({
  type,
  name,
  size = 20,
  color = 'inherit',
  className,
}) => {
  const icons = getIconSet(type);
  const IconComponent =
    (icons as Record<string, React.ComponentType<any>>)[name];

  if (!IconComponent) return null;

  return <IconComponent size={size} color={color} className={className} />;
};

export default Icon;
