import Modal from "../../../UI/modal/Modal";
import { useActions } from "../../../hooks/useActions";
import { useForm } from "react-hook-form";
import { FC } from "react";

interface CreateHallModalProps {
  basePrice: number;
  open: boolean;
  closeModal: () => void;
}

const CreateHallModal: FC<CreateHallModalProps> = ({ basePrice, open, closeModal }) => {
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

  return (
    <Modal open={open} onClose={closeModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Название зала:</p>
        <input {...register("title", { required: true })} name="title"  />
        {errors.title && <span>Заполните название</span>}

        <p>Количество мест:</p>
        <input
          type="number"
          {...register("count", {
            min: 1, max: 99,
            setValueAs: (v) => parseInt(v),
          })}
          name="count"
        />
        {errors.count && <span>Неверное кол-во</span>}
        <p>Цена билета:</p>
        <input
          defaultValue={basePrice}
          type="number"
          {...register("price", {
            min: 1, max: 999,
            setValueAs: (v) => parseInt(v),
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
