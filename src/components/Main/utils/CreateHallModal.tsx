import Modal from "../../../UI/modal/Modal";
import { useActions } from "../../../hooks/useActions";
import { FC } from "react";
import { useForm } from "react-hook-form";

import { useTypedSelector } from "hooks/useTypedSelector";

import { Button } from "styles/components";
import { ErrorMessage, ModalInput } from "UI/modal/styles";

interface CreateHallModalProps {
  basePrice: number;
  open: boolean;
  closeModal: () => void;
}

const CreateHallModal: FC<CreateHallModalProps> = ({
  basePrice,
  open,
  closeModal,
}) => {
  const { halls } = useTypedSelector((state) => state.hallReducer);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createHall } = useActions();

  const onSubmit = (data: any) => {
    createHall(data);
    closeModal();
    reset({});
  };

  const hallsTitles = halls.map((hall) => hall.title);

  return (
    <Modal open={open} onClose={closeModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Название зала:</p>
        <ModalInput
          {...register("title", {
            required: true,
            maxLength: 20,
            validate: (value) => !hallsTitles.includes(value),
          })}
          name="title"
        />
        {errors.title && errors.title.type === "required" && (
          <ErrorMessage>Это поле обязательно</ErrorMessage>
        )}
        {errors.title && errors.title.type === "maxLength" && (
          <ErrorMessage>Слишком длинное название</ErrorMessage>
        )}
        {errors.title && errors.title.type === "validate" && (
          <ErrorMessage>Такое название уже есть</ErrorMessage>
        )}

        <p>Количество мест:</p>
        <ModalInput
          type="number"
          {...register("count", {
            required: true,
            min: 1,
            max: 99,
          })}
          name="count"
        />
        {errors.count && errors.count.type === "required" && (
          <ErrorMessage>Это поле обязательно</ErrorMessage>
        )}
        {errors.count && errors.count.type === "min" && (
          <ErrorMessage>Слишком мало</ErrorMessage>
        )}
        {errors.count && errors.count.type === "max" && (
          <ErrorMessage>Слишком много</ErrorMessage>
        )}
        <p>Цена билета:</p>
        <ModalInput
          defaultValue={basePrice}
          type="number"
          {...register("price", {
            required: true,
            min: 1,
            max: 999,
          })}
          name="price"
        />
        {errors.price && <ErrorMessage>Неверная цена</ErrorMessage>}
        <Button type="submit">Создать</Button>
      </form>
    </Modal>
  );
};

export default CreateHallModal;
