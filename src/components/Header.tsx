import { FC } from "react";
import { HallHeader } from "styles/components";

interface HeaderProps {
  title?: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <HallHeader>{title ? `Зал: ${title}` : 'Кинотеатр "Мирамакс"'}</HallHeader>
  );
};

export default Header;
