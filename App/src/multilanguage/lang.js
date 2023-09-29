

export function getLang(store){
    // Check lang save in local storage
    let lang = localStorage.getItem('lang')
    
    // If no language select --> en
    if(!lang){
        localStorage.setItem('lang', 'en')
        lang = 'en'
    }
    
    // Load language into Vuex
    setLang(store, lang)
}

// ____________________________________________

const languages = [
    {
        name: 'en',

        SECTION_1: "EMPTY",
        noCatt: 'No categories found',
        noComp: 'No components found',
        createFirstCatt: 'Create your first one',
        createFirstComp: 'Create your first one',

        SECTION_2: "NAV-DRAWER",
        labelSearch: 'Search',
        h3_DisplayBtn: 'Display',
        ttBtn_ShowCatt: 'Show Category',
        ttBtn_ShowComp: 'Show Component',
        ttBtn_DisplayGrid: 'Display grid',
        ttBtn_DisplayRows: 'Display rows',
        h3_ShowIcons: 'Show',
        ttBtn_ShowIcons: 'Show Icons',
        ttBtn_HideIcons: 'Hide Icons',
        h3_Sort: 'Sort to',
        ttBtn_SortLessRecent: 'Less Recent',
        ttBtn_SortMostRecent: 'Most Recent',
        ttBtn_SortLittle: 'Little',
        ttBtn_SortMany: 'Many',
        h3_Backup: 'Backup',
        ctBtn_Settings: "Settings",

        SECTION_3: "TOP-BAR",
        ttBtn_ShowCatt: 'Show Category',
        ttBtn_ShowComp: 'Show Components',

        SECTION_4: "CREATE-MENU",
        ttBtn_CreateCatt: 'Create Category',
        ctBtn_CreateCatt: 'Category',
        ttBtn_CreateComp: 'Create Component',
        ctBtn_CreateComp: 'Component',

        SECTION_5: "FORM-NEW-CP",
        ttBtn_AddLocalIcon: 'Add Local Icon',
        ttBtn_DownLoadIcon: 'Download Icon',
        ttBtn_RecentIcons: 'Recent Icons',
        labelName: 'Name',
        labelDescription: 'Description',
        labelQuantity: 'Quantity',
        labelCategory: 'Category',

        SECTION_6: "BACKUP",
        ctBtn_Save: 'Save',
        ctBtn_Restore: 'Restore',
        ttBtn_GoBackup: 'Start backup',
        ttBtn_RestoreBackup: 'Restore backup',
        labelBackupFileInput: 'Backup file',
        h3_warningBackup: 'WARNING ! Any data not present in the backup will be lost !',
        h4_msgBackup: 'To avoid this, please change the options below',
        ttBtn_StartBackup: 'Start Backup',
        ttBtn_CancelBackup: 'Cancel Backup',
        h2_BackupError: 'Backup error',
        ttBtn_ShowErrorDetails: 'Show error details',
        ctBtn_ShowErrorDetails: 'Details',

        SECTEUR_7: "COMPONENT",
        ttBtn_ShowDescription: 'Show Description',
        ctBtn_Close: 'Close',
        ttBtn_Minus: 'Less',
        ttBtn_Plus: 'More',
        ttBtn_ExpandTrue: 'Show Details',
        ttBtn_ExpandFalse: 'Hide Details',

        SECTEUR_8: 'CATEGORY',
        ttBtn_OpenCatt: 'Open Category',
        textConfirmDelete: 'Delete this category ?',
        ctBtn_DeleteYes: 'Yes',
        ctBtn_DeleteNo: 'No',
        textCattEmpty: 'Category is empty',

        SECTEUR_9: "LITTLE-BTN",
        ttBtn_Set: 'Set',
        ttBtn_Delete: 'Delete',
        ttBtn_CreateCp: 'Create component',

        SECTEUR_10: "BIG-BTN",
        ttBtn_Create: 'Create',
        ttBtn_Menu: 'Menu',
        ttBtn_Done: 'Done',
        ttBtn_Cancel: 'Cancel',

        SECTEUR_11: "FLATICON",
        ttBtnBack: 'Go back',
        h1_NoResult: 'No result',
        h1_Offline: 'Offline',
        h1_ErrorJson: 'Error loading the icons file',
        ttBtn_NextPage: 'Next page',
        ttBtn_PreviousPage: 'Previous page'        
    },



    {
        name: 'fr',

        SECTION_1: "EMPTY",
        noCatt: 'Aucune catégorie trouvée',
        noComp: 'Aucun composant trouvé',
        createFirstCatt: 'Créez la première',
        createFirstComp: 'Créez le premier',

        SECTION_2: "NAV-DRAWER",
        labelSearch: 'Recherche',
        h3_DisplayBtn: 'Affichage',
        ttBtn_ShowCatt: 'Afficher les catégories',
        ttBtn_ShowComp: 'Afficher les composants',
        ttBtn_DisplayGrid: 'Afficher en grille',
        ttBtn_DisplayRows: 'Afficher en ligne',
        h3_ShowIcons: 'Afficher',
        ttBtn_ShowIcons: 'Afficher les icônes',
        ttBtn_HideIcons: 'Masquer les icônes',
        h3_Sort: 'Trier par',
        ttBtn_SortLessRecent: 'Moins récent',
        ttBtn_SortMostRecent: 'Plus récent',
        ttBtn_SortLittle: 'Peu',
        ttBtn_SortMany: 'Beaucoup',
        h3_Backup: 'Sauvegarde',
        ctBtn_Settings: "Paramètres",
    
        SECTION_3: "TOP-BAR",
        ttBtn_ShowCatt: 'Afficher les catégorie',
        ttBtn_ShowComp: 'Afficher les composants',
    
        SECTION_4: "CREATE-MENU",
        ttBtn_CreateCatt: 'Créer une catégorie',
        ctBtn_CreateCatt: 'Catégorie',
        ttBtn_CreateComp: 'Créer un composant',
        ctBtn_CreateComp: 'Composant',
    
        SECTION_5: "FORM-NEW-CP",
        ttBtn_AddLocalIcon: 'Ajouter une icône locale',
        ttBtn_DownLoadIcon: 'Télécharger une icône',
        ttBtn_RecentIcons: 'Icônes récentes',
        labelName: 'Nom',
        labelDescription: 'Description',
        labelQuantity: 'Quantité',
        labelCategory: 'Catégorie',
    
        SECTION_6: "BACKUP",
        ctBtn_Save: 'Sauvegarder',
        ctBtn_Restore: 'Restaurer',
        ttBtn_GoBackup: 'Démarrer la sauvegarde',
        ttBtn_RestoreBackup: 'Restaurer la sauvegarde',
        labelBackupFileInput: 'Fichier de sauvegarde',
        h3_warningBackup: 'ATTENTION ! Toutes les données non présentes dans la sauvegarde seront perdues !',
        h4_msgBackup: 'Pour éviter cela, vous pouvez modifier les options ci-dessous',
        ttBtn_StartBackup: 'Démarrer la sauvegarde',
        ttBtn_CancelBackup: 'Annuler la sauvegarde',
        h2_BackupError: 'Erreur de sauvegarde',
        ttBtn_ShowErrorDetails: 'Afficher les détails de l\'erreur',
        ctBtn_ShowErrorDetails: 'Détails',
    
        SECTEUR_7: "COMPONENT",
        ttBtn_ShowDescription: 'Afficher la description',
        ctBtn_Close: 'Fermer',
        ttBtn_Minus: 'Moins',
        ttBtn_Plus: 'Plus',
        ttBtn_ExpandTrue: 'Afficher les détails',
        ttBtn_ExpandFalse: 'Masquer les détails',
    
        SECTEUR_8: 'CATEGORY',
        ttBtn_OpenCatt: 'Ouvrir la catégorie',
        textConfirmDelete: 'Supprimer cette catégorie ?',
        ctBtn_DeleteYes: 'Oui',
        ctBtn_DeleteNo: 'Non',
        textCattEmpty: 'La catégorie est vide',
    
        SECTEUR_9: "LITTLE-BTN",
        ttBtn_Set: 'Modifier',
        ttBtn_Delete: 'Supprimer',
        ttBtn_CreateCp: 'Créer un composant',
    
        SECTEUR_10: "BIG-BTN",
        ttBtn_Create: 'Nouveau',
        ttBtn_Menu: 'Menu',
        ttBtn_Done: 'Terminé',
        ttBtn_Cancel: 'Annuler',
    
        SECTEUR_11: "FLATICON",
        ttBtnBack: 'Revenir en arrière',
        h1_NoResult: 'Aucun résultat',
        h1_Offline: 'Hors ligne',
        h1_ErrorJson: 'Erreur lors du chargement du fichier d\'icônes',
        ttBtn_NextPage: 'Page suivante',
        ttBtn_PreviousPage: 'Page précédente'
    
    }
]


export function setLang(store, lg){
    let lang = languages.find(lang => lang.name === lg)
    store.dispatch('setLang', lang) // Load language into Vuex
    localStorage.setItem('lang', lg) // Load language into Local storage
}
