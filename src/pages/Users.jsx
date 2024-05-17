import { useEffect, useReducer, useState } from "react";
import {
  Button,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { getUsers, createUser, deleteUser } from "../utils/usersHandler";
import ThreeDotsVerticalIcon from "../assets/ThreeDotsVerticalIcon";

function userReducer(state, action) {
  switch (action.type) {
    case "NAME":
      return { ...state, name: action.value };
    case "EMAIL":
      return { ...state, email: action.value };
    case "ERROR_NAME":
      return { ...state, errorName: action.value };
    case "ERROR_EMAIL":
      return { ...state, errorEmail: action.value };
    case "RESET":
      return { name: "", email: "", errorName: false, errorEmail: false };
    default:
      return state;
  }
}

export default function Users() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userState, userDispatch] = useReducer(userReducer, {
    name: "",
    email: "",
    errorName: false,
    errorEmail: false,
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  function loadUsers() {
    getUsers().then((data) => {
      if (!data.success) {
        return;
      }
      setUsers(data.data);
    });
  }

  function handleCreateUserClick(event, onClose) {
    if (userState.name === "") {
      userDispatch({ type: "ERROR_NAME", value: true });
      return;
    } else {
      userDispatch({ type: "ERROR_NAME", value: false });
    }
    if (userState.email === "") {
      userDispatch({ type: "ERROR_EMAIL", value: true });
      return;
    } else {
      userDispatch({ type: "ERROR_EMAIL", value: false });
    }
    onClose();
    setUsers((prev) => [...prev, { id: crypto.randomUUID(), ...userState }]);
    createUser(userState).then((data) => {
      if (!data.success) {
        return;
      }
      loadUsers();
    });
  }

  function handleDeleteUserClick(user) {
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
    deleteUser(user.id).then((data) => {
      if (!data.success) {
        return;
      }
      loadUsers();
    });
  }

  return (
    <>
      <div className="flex flex-col h-full items-center">
        <div className="max-w-4xl w-full px-4 mt-16">
          <div className="flex items-center justify-between px-6 py-2">
            <h1 className="text-3xl">Users</h1>
            <Button size="sm" color="primary" onPress={onOpen}>
              Create User
            </Button>
          </div>
          <Table
            aria-label="Users Table"
            selectionMode="single"
            classNames={{
              wrapper: "max-[500px]:bg-transparent max-[500px]:shadow-none",
            }}
          >
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn className="text-right">Actions</TableColumn>
            </TableHeader>
            <TableBody items={users} emptyContent={"No Users"}>
              {(item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell className="text-right">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          size="sm"
                          color="default"
                          variant="light"
                          className="rounded-full aspect-square min-w-0 p-0"
                        >
                          <ThreeDotsVerticalIcon className="w-5 h-5 text-default" />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu>
                        <DropdownItem
                          color="danger"
                          className="text-danger"
                          onPress={() => {
                            handleDeleteUserClick(item);
                          }}
                        >
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={(value) => {
          userDispatch({ type: "RESET" });
          onOpenChange(value);
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Create User</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Name"
                  placeholder="Enter users name"
                  variant="bordered"
                  errorMessage={"Enter a valid name"}
                  isInvalid={userState.errorName}
                  value={userState.name}
                  onValueChange={(value) =>
                    userDispatch({ type: "NAME", value: value })
                  }
                />
                <Input
                  autoFocus
                  label="Email"
                  placeholder="Enter users email"
                  variant="bordered"
                  errorMessage={"Enter a valid email address"}
                  isInvalid={userState.errorEmail}
                  color={userState.errorEmail ? "danger" : "default"}
                  value={userState.email}
                  onValueChange={(value) =>
                    userDispatch({ type: "EMAIL", value: value })
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={(event) => {
                    onClose(event);
                    userDispatch({ type: "RESET" });
                  }}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={(event) => {
                    handleCreateUserClick(event, onClose);
                  }}
                >
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
