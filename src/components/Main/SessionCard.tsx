import { FC, memo, useContext } from "react";

import { useActions } from "hooks/useActions";
import { AuthContext } from "context/AuthContext";

import { ButtonDel, Controls, StyledLink } from "styles/components";
import {
  HallItem,
  HallItemContent,
  HallItemPoster,
} from "components/Main/styles";

interface SessionCardProps {
  link: string;
  title: string;
  movie: string;
  id: string;
  poster: string;
}

const HallCard: FC<SessionCardProps> = ({ link, title, movie, id, poster }) => {
  const { deleteSession } = useActions();
  const [auth] = useContext(AuthContext);

  const handleClick = (key: string) => {
    return () => {
      deleteSession(key);
    };
  };

  return (
    <HallItem>
      {poster && <HallItemPoster $poster={poster} />}
      <HallItemContent>
        <p>Зал: {title}</p>
        <p>
          <b>{movie}</b>
        </p>
        <Controls>
          <StyledLink to={"hall/" + link}>Изменить</StyledLink>
          {auth ? (
            <ButtonDel onClick={handleClick(id)}>Удалить</ButtonDel>
          ) : null}
        </Controls>
      </HallItemContent>
    </HallItem>
  );
};

export const MemoizedHallCard = memo(HallCard);
