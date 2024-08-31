import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

export default function SuccessModal({
  message,
  isOpen,
  onOpenChange,
}: {
  message: string;
  isOpen: any;
  onOpenChange: any;
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Success</ModalHeader>
            <ModalBody>{message}</ModalBody>
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
