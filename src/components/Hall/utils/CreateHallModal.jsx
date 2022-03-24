import Modal from "../../../UI/modal/Modal";
import { useActions } from "../../../hooks/useActions";
import { useForm } from "react-hook-form";

const CreateHallModal = ({ basePrice, open, closeModal }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createHall } = useActions();

  const onSubmit = (data) => {
    createHall(data);
    closeModal();
    reset({});
  };

  return (
    <Modal open={open} onClose={closeModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Название зала:</p>
        <input name="title" {...register("title", { required: true })} />
        {errors.title && <span>Заполните название</span>}

        <p>Количество мест:</p>
        <input
          type="number"
          name="count"
          {...register("count", {
            validate: (value) => value > 0 && value < 99,
            setValueAs: (v) => parseInt(v),
          })}
        />
        {errors.count && <span>Неверное кол-во</span>}
        <p>Цена билета:</p>
        <input
          defaultValue={basePrice}
          type="number"
          name="price"
          {...register("price", {
            validate: (value) => value > 0 && value < 999,
            setValueAs: (v) => parseInt(v),
          })}
        />
        {errors.price && <span>Заполните цену</span>}
        <div>
          <br />
          <input type="submit" value="Создать" />
        </div>
      </form>
    </Modal>
  );
};

export default CreateHallModal;
