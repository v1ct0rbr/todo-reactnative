import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, ImagePropTypes, AsyncStorage, LogBox } from 'react-native';
import { useFonts, Lato_400Regular, Lato_900Black_Italic } from '@expo-google-fonts/lato'
import FlashMessage, { showMessage } from 'react-native-flash-message'
import { AppLoading } from 'expo';
import ItemList from './components/ItemList';
import MyModal from './components/TaskModal'

export default function App() {

  const image = require("./resources/bg02.png");
  const INITIAL_STATE = {
    id: 0, nome: '', urgente: false, done: false
  }

  const [tarefaAtual, setTarefaAtual] = useState({ ...INITIAL_STATE });
  const [tarefas, setTarefas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [lastID, setLastId] = useState(0);

  useEffect(() => {
    // action on update of movies
    //alert('app carregado..')
    (async () => {
      try {
        let tarefasStorage = await AsyncStorage.getItem('tarefas')
        let lastIdStorage = await AsyncStorage.getItem('lastId');
        if (tarefasStorage == null)
          setTarefas([])
        else
          setTarefas(JSON.parse(tarefasStorage))

        if (lastIdStorage == null)
          setLastId(0);
        else
          setLastId(JSON.parse(lastIdStorage))

      } catch (error) { }
    })()
  }, []);

  useEffect(() => {
    // action on update of movies
    //alert('app carregado..')
    (async () => {
      try {
        AsyncStorage.setItem('lastId', JSON.stringify(lastID))

      } catch (error) {

      }
    })()
  }, [lastID]);
  useEffect(() => {
    // action on update of movies
    //alert('app carregado..')
    (async () => {
      try {
        AsyncStorage.setItem('tarefas', JSON.stringify(tarefas))

      } catch (error) {

      }
    })()
  }, [tarefas]);

  let [fontsLoaded] = useFonts({
    Lato_400Regular, Lato_900Black_Italic
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  (async () => {

    LogBox.ignoreAllLogs(true);
  })();




  const showModal = () => {
    setModalVisible(true);
  }
  const hideModal = () => {
    setModalVisible(false);

  }


  const handleAdd = () => {
    let newArray = [...tarefas]
    let index = tarefas.findIndex((elem) => elem.id == tarefaAtual.id)
    if (index > -1) {
      newArray.splice(index, 1, tarefaAtual);
      setTarefas(newArray)
    } else {
      let newObject = { ...tarefaAtual, id: (lastID + 1) }
      setTarefas([...tarefas, newObject])
      setLastId(lastID + 1);
      showMessage({
        message: "Cadastrado com sucesso",
        type: "success",
      });
    }
    /* console.log(`ultimo id before add: ${lastID}`)
    console.log('tarefa atual: ')
    console.log(JSON.stringify(tarefaAtual)) */
    hideModal();
  }

  const handleEdit = (id) => {
    let tarefasTemp = [...tarefas];
    let tarefaEdit = tarefasTemp.find((elem) => elem.id == id)
    console.log(tarefaEdit)
    if (tarefaEdit != null) {
      setTarefaAtual({ ...tarefaEdit })
      showModal()
    } else {
      alert('nenhuma tarefa selecionada')
    }
  }
  const handleFinish = (id) => {
    let tarefasTemp = [...tarefas];
    var task = tarefas.find((elem) => elem.id == id)
    if (task != null) {
      let novoEstado = task.done == true ? false : true
      let tarefa = { ...task, done: novoEstado };
      tarefasTemp.splice(tarefas.indexOf(task), 1, tarefa)

      setTarefas([...tarefasTemp])

      if (novoEstado) {
        showMessage({
          message: "Finalizado com sucesso",
          type: "success",
        });
      } else
        showMessage({
          message: "Status de finalizado desfeito",
          type: "warning",
        });
    }
  }

  const handleMove = (idx, type) => {

    var newArray = [...tarefas];

    if (type == "up") {
      if (idx > 0) {
        [newArray[idx], newArray[idx - 1]] = [newArray[idx - 1], newArray[idx]]
      }
    } else {
      if (idx < tarefas.length - 1)
        [newArray[idx], newArray[idx + 1]] = [newArray[idx + 1], newArray[idx]]
    }
    setTarefas(newArray)

  }

  const handleNovaTarefa = () => {
    setTarefaAtual({ ...INITIAL_STATE, id: (lastID + 1) })
    showModal();
  }

  const handleRemove = (id) => {

    let array = tarefas.filter(function (val, index) {
      return val.id != id;
    })

    setTarefas(array)
    showMessage({
      message: "excluído com sucesso",
      type: "success",
    });
  }


  const handleChangeField = (field, value) => {
    if (field == "nome") {
      setTarefaAtual({ ...tarefaAtual, nome: value })
    } else if (field == "urgente") {
      setTarefaAtual({ ...tarefaAtual, urgente: value })
    } else if (field == "done") {
      setTarefaAtual({ ...tarefaAtual, done: value })
    } else if (field == "id") {
      setTarefaAtual({ ...tarefaAtual, id: value })
    }
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <StatusBar translucent={true} />
      <ImageBackground style={styles.image} source={image}>
        <View style={styles.coverview}>
          <Text style={styles.title}>Lista de Tarefas</Text>
        </View>
      </ImageBackground>

      <MyModal visible={modalVisible} showModal={showModal} hideModal={hideModal} handleAdd={handleAdd} handleNovaTarefa={handleNovaTarefa} handleChange={handleChangeField} item={tarefaAtual} title="Cadastrar de tarefa"></MyModal>

      { tarefas.map((tar, index) => <ItemList index={index} object={tar} handleMove={handleMove} handleFinish={handleFinish} handleEdit={handleEdit} handleRemove={handleRemove} modalVisible={modalVisible}
        backgroundColor={tar.urgente == true ? "#eac5c5" : "white"}></ItemList>)
      }
      <FlashMessage position="top" />
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: "100%",
    height: 100,
    // marginBottom: 15
  },
  coverview: {
    width: "100%",
    height: 100,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "800",
    fontFamily: "Lato_400Regular"
  },

});
