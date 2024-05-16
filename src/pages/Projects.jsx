import { useEffect, useState } from "react";
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
} from "@nextui-org/react";
import { createProject, getProjects } from "../utils/entriesHandler";

export default function Projects() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  function loadProjects() {
    getProjects().then((data) => {
      if (!data.success) {
        return;
      }
      setProjects(data.data);
    });
  }

  function handleCreateProjectClick(event) {
    setProjects((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: projectName, totalTime: "00:00:00" },
    ]);
    createProject({ name: projectName }).then((data) => {
      if (!data.success) {
        return;
      }
      loadProjects();
      setProjectName("");
    });
  }

  return (
    <>
      <div className="flex flex-col h-full items-center">
        <div className="max-w-4xl w-full px-4 mt-16">
          <div className="flex items-center justify-between px-6 py-2">
            <h1 className="text-3xl">Projects</h1>
            <Button size="sm" color="primary" onPress={onOpen}>
              Create Project
            </Button>
          </div>
          <Table
            aria-label="Project Table"
            selectionMode="single"
            classNames={{
              wrapper: "max-[500px]:bg-transparent max-[500px]:shadow-none",
            }}
          >
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn align="end" className="text-right">
                Total Time
              </TableColumn>
            </TableHeader>
            <TableBody items={projects} emptyContent={"No Projects"}>
              {(item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-right">{item.totalTime}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Create Project</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Project"
                  placeholder="Enter new project name"
                  variant="bordered"
                  value={projectName}
                  onValueChange={setProjectName}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={(event) => {
                    onClose(event);
                    setProjectName("");
                  }}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={(event) => {
                    onClose(event);
                    handleCreateProjectClick(event);
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
