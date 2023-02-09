import { AddIcon, Button, View, VStack } from 'native-base'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native'

import { withContext } from '../../hoc/withContext'
import { Modal } from '../../modal/ModalController'
import { ProjectAddDialog } from './_components/ProjectAddDialog'
import { ProjectListView } from './_components/ProjectListView/ProjectListView'
import { HomePageContext, HomePageContextProvider } from './HomePage.context'

// TODO: reload page after adding project

export const _HomePage = () => {
  const { projects, projectsAccess } = useContext(HomePageContext)

  return (
    <SafeAreaView>
      <View bg="primary.700" w="full" h="50px" position="absolute" />
      <VStack mx={4} space={4} maxWidth={480} w="100%" alignSelf="center">
        <ProjectListView projects={projects} projectAccess={projectsAccess} />
        <Button
          leftIcon={<AddIcon />}
          alignSelf="start"
          variant="outline"
          onPress={() => Modal.dialog(props => <ProjectAddDialog {...props} />)}
        >
          Create new project
        </Button>
      </VStack>
    </SafeAreaView>
  )
}

export const HomePage = withContext(_HomePage, HomePageContextProvider)
