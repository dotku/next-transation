import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

export default function ErrorModal({
  isOpen,
  onOpenChange,
}: {
  isOpen: any;
  onOpenChange: any;
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Error</ModalHeader>
            <ModalBody>Something goes wrong, please comeback later</ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                Okay
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
