import Header from "components/Header";

import { Aside, ContentContainer } from "components/Main/styles";
import { StyledLink } from "styles/components";

const Settings = () => {
  return (
    <>
      <Header />

      <Aside></Aside>

      <ContentContainer>
        <div>
          <h1>Страница настройки</h1>
          <br />

          <StyledLink to="/">Назад</StyledLink>
        </div>
      </ContentContainer>
    </>
  );
};

export default Settings;
