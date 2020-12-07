import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import Checkbox from '@react-native-community/checkbox'
import ActionButton from './ActionButton'
import { FontAwesome5 } from '@expo/vector-icons'

import { TextInput, Checkbox, Button } from 'react-native-paper'
import Colors from '../utils/colors'


export default function TaskModal(props) {




    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.visible}
                /* onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }} */
                >

                <View style={styles.centeredView}>

                    <View style={styles.modalView}>

                        <Text style={styles.modalText}>{props.title}</Text>


                        <TextInput onChangeText={(text) => { props.handleChange("nome", text) }} autoFocus={true} label="Digite a tarefa" value={props.item.nome} defaultValue={props.item.nome}></TextInput>


                        <View style={{ flex: 2, flexDirection: "row", flexWrap: "wrap", marginTop: 20 }}>

                            <View style={styles.checkbox}>
                                <Text>Urgente</Text>
                                <Checkbox onPress={() => props.handleChange('urgente', !props.item.urgente)} status={props.item.urgente ? 'checked' : 'unchecked'}></Checkbox>
                            </View>
                            <View style={styles.checkbox}>
                                <Text>Finalizado</Text>
                                {/* <Checkbox onValueChange={(value) => { props.handleChange("done", value) }} value={props.item.done}></Checkbox> */}
                                <Checkbox onPress={() => props.handleChange('done', !props.item.done)} status={props.item.done ? 'checked' : 'unchecked'}></Checkbox>
                            </View>
                        </View>
                        <View style={{ flex: 2, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            <Button icon="content-save" mode="contained" style={{ backgroundColor: Colors.confirmButton }} onPress={() => {props.handleAdd() }}>
                                Confirmar
                            </Button>
                            <Button icon="close-circle" mode="contained" style={{ backgroundColor: Colors.cancelButton }}
                                onPress={() => { props.hideModal() }}>
                                Cancelar
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
            <ActionButton onPress={() => { props.handleNovaTarefa() }} isButton={true} icon="plus-circle" title="Cadastrar nova tarefa" style={styles.openButton}></ActionButton>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        marginTop: 22,
        alignItems: "center"
    },
    modalView: {

        margin: 20,
        width: "90%",
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 5,
        height: 300

    },
    formField: {
        alignItems: 'flex-start'
    },
    checkbox: {

        paddingRight: 40,
        alignItems: 'center'
    },
    openButton: {
        /*  backgroundColor: '#F194FF',
         borderRadius: 20,
         elevation: 2,
         textAlign: "center", alignItems: "center",
         justifyContent: "center" */
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 12,
        elevation: 2,
        height: 50,
        textAlignVertical: "center",
        alignItems: "center",
        marginBottom: 2,
        marginRight: 5,
        width: "50%"
    },
    cancelButton: {
        backgroundColor: '#ed9393',
        borderRadius: 20,
        position: "relative",
        top: 1,
        left: "90%",
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 15,
        textAlign: 'center',
    },
});
