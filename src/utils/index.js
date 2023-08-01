import Swal from "sweetalert2";

export const showConfirmation = (props) => {
  return Swal.fire({
    title: "Are you sure?",
    text: `${props.text}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  });
};
