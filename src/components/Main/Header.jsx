const Header = ({ title }) => {
  return <header>{title ? `Зал: ${title}` : 'Кинотеатр "Мирамакс"'}</header>;
};

export default Header;
