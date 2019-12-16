import React from 'react';
import UserLayout from '../../components-hoc/layout-user'
import MyButton from '../utils/my-button'

const UserDashboard = () => {
  return (
    <UserLayout>
      <div>
         <div className="user_nfo_panel">
           <h1>User information</h1>
           <div>
             <span>Name: Andy Piao</span>
             <span>Email: andy@gmail.com</span>
           </div>


          <MyButton
            type="default"
            title="Edit account info"
            linkTo="/user/user_profile"
            />

            <div className="user_nfo_panel">
              <h1>History of purchases</h1>
              <div className="user_product_block_wrapper">
                History
              </div>
            </div>

         </div>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;