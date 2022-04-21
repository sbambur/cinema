import Modal from "../../../UI/modal/Modal";
import { useActions } from "../../../hooks/useActions";
import { FC } from "react";
import { useForm } from "react-hook-form";

import { useTypedSelector } from "hooks/useTypedSelector";

import { Button } from "styles/components";
import { ErrorMessage, ModalSelect } from "UI/modal/styles";
import { Select } from "antd";
const { Option } = Select;

interface CreateHallModalProps {
  open: boolean;
  closeModal: () => void;
}

const CreateSessionModal: FC<CreateHallModalProps> = ({ open, closeModal }) => {
  const { scheme } = useTypedSelector((state) => state.schemeReducer);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createSession } = useActions();

  const onSubmit = (data: any) => {
    createSession(data);
    closeModal();
    reset({});
  };

  return (
    <Modal open={open} onClose={closeModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Зал:</p>

        <ModalSelect {...register("schemeTitle")} name="schemeTitle">
          {scheme.map((chemeOne) => {
            return (
              <option key={chemeOne.id} value={chemeOne.id}>
                {chemeOne.title}
              </option>
            );
          })}
        </ModalSelect>

        {/* <Select
          {...register("schemeTitle")}
          showSearch
          placeholder="Выберите зал"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
        >
          {scheme.map((chemeOne) => {
            return <Option value={chemeOne.title}>{chemeOne.title}</Option>;
          })}
        </Select> */}
        {errors.title && errors.title.type === "required" && (
          <ErrorMessage>Это поле обязательно</ErrorMessage>
        )}
        <p></p>
        <Button type="submit">Создать</Button>
      </form>
    </Modal>
  );
};

export default CreateSessionModal;
