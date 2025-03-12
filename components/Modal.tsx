import React from "react"
import { Modal as RNModal } from "react-native"

import { View } from "react-native"
import { ModalProps } from "react-native"

type PROPS = ModalProps & {
    isOpen: boolean
    withInput?: boolean
}

export const Modal = ({isOpen, withInput, children, ...rest}:PROPS ) => {
   const content =
    <View>
        {children}
    </View>
    return(
        <RNModal
            visible={isOpen}
            transparent
            animationType="fade"
            {...rest}
        >
        {content}
        </RNModal>
    )
}