import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { User } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

interface Props {
    show: boolean;
    onClose: CallableFunction;
    user: User;
}

interface Role {
    id:number;
    name:string;
}
export default function EditUserForm(props:Props) {
   // console.log()
    const adminChecked = props.user.roles.includes('admin');
    const moderatorChecked = props.user.roles.includes('moderator');

 
    const {
          data,
          setData,
          put: manage,
          processing,
          reset,
          errors,
          clearErrors,
      } = useForm({
          adminChecked: adminChecked,
          moderatorChecked: moderatorChecked,
      });
  
      // const confirmUserBanForm = () => {
      //     props.onClose(true);
      // };
  
      const editUser: FormEventHandler = (e) => {
          e.preventDefault();
  
          manage(route('admin.user-roles', { user: props.user.id }), {
              preserveScroll: true,
              onSuccess: () => closeModal(),
              onFinish: () => reset(),
          });
      };
  
      const closeModal = () => {
          props.onClose(false);
  
          clearErrors();
          reset();
      };
      return (
          <Modal show={props.show} onClose={props.onClose}>
              <form onSubmit={editUser} className="p-6">
                  <h2 className="text-lg font-medium text-gray-900">
                      Are you sure you want to edit user {props.user.username}?
                  </h2>
  
                  <p className="mt-1 text-sm text-gray-600">
                      You can give roles to user. You can give or remove both roles.
                  </p>
  
                  <div className="mt-6">
                      <InputLabel htmlFor="admincheckbox" value="AdminCheckbox" className="sr-only" />
  
                      <label htmlFor="admincheckbox">Give admin role to user</label>
                      <TextInput
                          id="admincheckbox"
                          type="checkbox"
                          name="admincheckbox"
                          checked={data.adminChecked}
                          onChange={(e) => setData('adminChecked', e.target.checked)}
                          className="mt-1 block"
                          isFocused
                         
                      />
                       <InputError message={errors.adminChecked} className="mt-2" />

                       <InputLabel htmlFor="moderatorcheckbox" value="ModeratorCheckbox" className="sr-only" />

                         <label htmlFor="moderatorcheckbox">Give moderator role to user</label>
                      <TextInput
                          id="moderatorcheckbox"
                          type="checkbox"
                          name="moderatorcheckbox"
                          checked={data.moderatorChecked}
                          onChange={(e) => setData('moderatorChecked', e.target.checked)}
                          className="mt-1 block"
                          isFocused
                       
                      />
  
                      <InputError message={errors.moderatorChecked} className="mt-2" />
                  </div>
  
                  <div className="mt-6 flex justify-end">
                      <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
  
                      <DangerButton className="ms-3" disabled={processing}>
                          Accept
                      </DangerButton>
                      
                  </div>
              </form>
          </Modal>
      );
}
