import { FC } from "react";

interface HeaderProps {
  title?: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  return <header>{title ? `Зал: ${title}` : 'Кинотеатр "Мирамакс"'}</header>;
};

export default Header;
