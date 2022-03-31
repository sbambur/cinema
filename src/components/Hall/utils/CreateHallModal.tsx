import Modal from "../../../UI/modal/Modal";
import { useActions } from "../../../hooks/useActions";
import { FC } from "react";
import { useForm } from "react-hook-form";

import { useTypedSelector } from "hooks/useTypedSelector";

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
        <input
          {...register("title", {
            required: true,
            maxLength: 20,
            validate: (value) => !hallsTitles.includes(value),
          })}
          name="title"
        />
        {errors.title && errors.title.type === "required" && (
          <span>Это поле обязательно"</span>
        )}
        {errors.title && errors.title.type === "maxLength" && (
          <span>Слишком длинное название</span>
        )}
        {errors.title && errors.title.type === "validate" && (
          <span>Такое название уже есть</span>
        )}

        <p>Количество мест:</p>
        <input
          type="number"
          {...register("count", {
            required: true,
            min: 1,
            max: 99,
          })}
          name="count"
        />
        {errors.count && errors.count.type === "required" && (
          <span>Это поле обязательно</span>
        )}
        {errors.count && errors.count.type === "min" && (
          <span>Слишком мало</span>
        )}
        {errors.count && errors.count.type === "max" && (
          <span>Слишком много</span>
        )}
        <p>Цена билета:</p>
        <input
          defaultValue={basePrice}
          type="number"
          {...register("price", {
            required: true,
            min: 1,
            max: 999,
          })}
          name="price"
        />
        {errors.price && <span>Неверная цена</span>}
        <div>
          <br />
          <input type="submit" value="Создать" />
        </div>
      </form>
    </Modal>
  );
};

export default CreateHallModal;
