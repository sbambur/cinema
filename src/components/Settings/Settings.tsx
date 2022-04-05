import { Aside, ContentContainer } from "components/Main/styles";
import { HallHeader, StyledLink } from "styles/components";

const Settings = () => {
  return (
    <>
      <HallHeader>Настройки</HallHeader>

      <Aside></Aside>

      <ContentContainer>
        <div>
          <StyledLink to="/">Назад</StyledLink>
        </div>
      </ContentContainer>
    </>
  );
};

export default Settings;
