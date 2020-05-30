import React from "react";
import { UsersList } from "../../../components/Users";
import { Container } from "../../../styles/generalStyles";
import DefaultLayout from "../../layouts/default";
import { withFirebase } from "../../../services/fb";

const Users = withFirebase(UsersList);

export const Home: React.FC = () => {
  return (
    <div>
      <DefaultLayout>
        <Container>
          <Users></Users>
        </Container>
      </DefaultLayout>
    </div>
  );
};
