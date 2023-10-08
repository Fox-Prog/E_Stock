

export function getLang(){
    // Check lang save in local storage
    let lang = localStorage.getItem('lang')
    
    // If no language select --> en
    if(!lang || lang === 'en' || lang === 'fr'){
        localStorage.setItem('lang', 'English')
        lang = 'English'
    }
}

export function getLangsNames(){
    return languages.map(lang => lang.name).sort()
}

export function setLang(lg){
    localStorage.setItem('lang', lg)
    document.location.reload(true);
}

export function getFlag(lg){
    const language = languages.find(lang => lang.name === lg)
    return language.flag
}

export function getTranslate(){
    const langSave = localStorage.getItem('lang')
    const lang = langSave ? langSave : 'English'
    return languages.find(lg => lg.name === lang)
}


// ____________________________________________

const languages = [
    {
        name: 'Deutsch',
        flag: "/images/flag/de.webp",

        SECTION_1: "LEER",
        noCatt: 'Keine Kategorie gefunden',
        noComp: 'Keine Komponente gefunden',
        createFirstCatt: 'Erstellen Sie die erste',
        createFirstComp: 'Erstellen Sie die erste',

        SECTION_2: "NAVIGATIONSSCHUBLADE",
        labelSearch: 'Suche',
        tt_SearchBar: 'Suchleiste',
        h3_DisplayBtn: 'Anzeige',
        ttBtn_ShowCatt: 'Kategorien anzeigen',
        ttBtn_ShowComp: 'Komponenten anzeigen',
        ttBtn_DisplayGrid: 'Als Gitter anzeigen',
        ttBtn_DisplayRows: 'Als Zeile anzeigen',
        h3_ShowIcons: 'Anzeigen',
        ttBtn_ShowIcons: 'Symbole anzeigen',
        ttBtn_HideIcons: 'Symbole ausblenden',
        h3_Sort: 'Sortieren nach',
        ttBtn_SortLessRecent: 'Weniger aktuell',
        ttBtn_SortMostRecent: 'Neueste',
        ttBtn_SortLittle: 'Wenig',
        ttBtn_SortMany: 'Viel',
        h3_selectMode: 'Mehrfachauswahl',
        ttBtn_Enable: 'Aktivieren',
        ttBtn_Disable: 'Deaktivieren',
        h3_Backup: 'Sicherung',
        ctBtn_Settings: "Einstellungen",

        SECTION_3: "ERSTELLEN-MENÜ",
        ttBtn_CreateCatt: 'Kategorie erstellen',
        ctBtn_CreateCatt: 'Kategorie',
        ttBtn_CreateComp: 'Komponente erstellen',
        ctBtn_CreateComp: 'Komponente',

        SECTION_4: "FORMULAR-NEU-CP",
        ttBtn_AddLocalIcon: 'Lokales Symbol hinzufügen',
        ttBtn_DownLoadIcon: 'Symbol herunterladen',
        ttBtn_RecentIcons: 'Aktuelle Symbole',
        labelName: 'Name',
        labelDescription: 'Beschreibung',
        labelQuantity: 'Menge',
        labelCategory: 'Kategorie',

        SECTION_5: "SICHERUNG",
        ctBtn_Save: 'Speichern',
        ctBtn_Restore: 'Wiederherstellen',
        ttBtn_GoBackup: 'Sicherung starten',
        ttBtn_RestoreBackup: 'Sicherung wiederherstellen',
        labelBackupFileInput: 'Sicherungsdatei',
        h3_warningBackup: 'ACHTUNG! Alle Daten, die nicht in der Sicherung vorhanden sind, gehen verloren!',
        h4_msgBackup: 'Um dies zu vermeiden, können Sie die unten stehenden Optionen ändern',
        ttBtn_StartBackup: 'Sicherung starten',
        ttBtn_CancelBackup: 'Sicherung abbrechen',
        h2_BackupError: 'Sicherungsfehler',
        ttBtn_ShowErrorDetails: 'Fehlerdetails anzeigen',
        ctBtn_ShowErrorDetails: 'Details',

        SECTION_6: "KOMPONENTE",
        ttBtn_ShowDescription: 'Beschreibung anzeigen',
        ctBtn_Close: 'Schließen',
        ttBtn_Minus: 'Minus',
        ttBtn_Plus: 'Plus',
        ttBtn_ExpandTrue: 'Details anzeigen',
        ttBtn_ExpandFalse: 'Details ausblenden',

        SECTION_7: 'KATEGORIE',
        ttBtn_OpenCatt: 'Kategorie öffnen',
        textConfirmDelete: 'Diese Kategorie löschen?',
        ctBtn_DeleteYes: 'Ja',
        ctBtn_DeleteNo: 'Nein',
        textCattEmpty: 'Die Kategorie ist leer',

        SECTION_8: "KLEINER KNOPF",
        ttBtn_Set: 'Bearbeiten',
        ttBtn_Delete: 'Löschen',
        ttBtn_CreateCp: 'Komponente erstellen',

        SECTION_9: "GROSSER KNOPF",
        ttBtn_Create: 'Neu',
        ttBtn_Menu: 'Menü',
        ttBtn_Done: 'Fertig',
        ttBtn_Cancel: 'Abbrechen',
        ttBtn_DeleteAll: 'Entfernen',

        SECTION_10: "FLATICON",
        ttBtnBack: 'Zurück',
        h1_NoResult: 'Keine Ergebnisse',
        h1_Offline: 'Offline',
        h1_ErrorJson: 'Fehler beim Laden der Symboldatei',
        h3_checkConnect: 'Überprüfen Sie Ihre Internetverbindung',
        ttBtn_NextPage: 'Nächste Seite',
        ttBtn_PreviousPage: 'Vorherige Seite',

        SECTEUR_11: "SETTINGS",
        h3_titleContactForm: 'Kontaktformular',
        labelEmail: 'Ihre E-Mail-Adresse',
        objectEmail: 'Betreff der E-Mail',
        objects:
        {
            bug: 'Problem melden',
            feedback: 'Feedback geben',
            other: 'Anderer Grund'
        },
        labelMailArea: 'Geben Sie hier Ihre Nachricht ein',
        sendMail: 'Senden',
        mailDone: 'E-Mail erfolgreich gesendet',
        mailError: 'Fehler, E-Mail konnte nicht gesendet werden',
        offlineError: 'Du bist offline',

        SECTEUR_12: 'CHECK-FIELD',
        requireMsg: 'Dieses Feld ist erforderlich',
        nameAlreadyExists: 'Dieser Name existiert bereits',
        max50: 'Maximal 50 Zeichen',
        noNegativeNumber: 'Keine negativen Zahlen erlaubt',
        unknownCategory: 'Unbekannte Kategorie',
        isNotEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',

        SECTEUR_13: "Multi selections",
        selectedCount: 'ausgewählte Elemente',
        textConfirmDeleteAll: 'Alle ausgewählten Elemente entfernen?',       

    },

    {
        name: 'English',
        flag: "images/flag/en.webp",

        SECTION_1: "EMPTY",
        noCatt: 'No categories found',
        noComp: 'No components found',
        createFirstCatt: 'Create your first one',
        createFirstComp: 'Create your first one',

        SECTION_2: "NAV-DRAWER",
        labelSearch: 'Search',
        tt_SearchBar: 'Search bar',
        h3_DisplayBtn: 'Display',
        ttBtn_ShowCatt: 'Show Category',
        ttBtn_ShowComp: 'Show Components',
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
        h3_selectMode: 'Multiple selections',
        ttBtn_Enable: 'Enable',
        ttBtn_Disable: 'Disable',
        h3_Backup: 'Backup',
        ctBtn_Settings: "Settings",

        SECTION_3: "CREATE-MENU",
        ttBtn_CreateCatt: 'Create Category',
        ctBtn_CreateCatt: 'Category',
        ttBtn_CreateComp: 'Create Component',
        ctBtn_CreateComp: 'Component',

        SECTION_4: "FORM-NEW-CP",
        ttBtn_AddLocalIcon: 'Add Local Icon',
        ttBtn_DownLoadIcon: 'Download Icon',
        ttBtn_RecentIcons: 'Recent Icons',
        labelName: 'Name',
        labelDescription: 'Description',
        labelQuantity: 'Quantity',
        labelCategory: 'Category',

        SECTION_5: "BACKUP",
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

        SECTEUR_6: "COMPONENT",
        ttBtn_ShowDescription: 'Show Description',
        ctBtn_Close: 'Close',
        ttBtn_Minus: 'Less',
        ttBtn_Plus: 'More',
        ttBtn_ExpandTrue: 'Show Details',
        ttBtn_ExpandFalse: 'Hide Details',

        SECTEUR_7: 'CATEGORY',
        ttBtn_OpenCatt: 'Open Category',
        textConfirmDelete: 'Remove this category ?',
        ctBtn_DeleteYes: 'Yes',
        ctBtn_DeleteNo: 'No',
        textCattEmpty: 'Category is empty',

        SECTEUR_8: "LITTLE-BTN",
        ttBtn_Set: 'Set',
        ttBtn_Delete: 'Delete',
        ttBtn_CreateCp: 'Create component',

        SECTEUR_9: "BIG-BTN",
        ttBtn_Create: 'Create',
        ttBtn_Menu: 'Menu',
        ttBtn_Done: 'Done',
        ttBtn_Cancel: 'Cancel',
        ttBtn_DeleteAll: 'Delete',

        SECTEUR_10: "FLATICON",
        ttBtnBack: 'Go back',
        h1_NoResult: 'No result',
        h1_Offline: 'Offline',
        h1_ErrorJson: 'Error loading the icons file',
        h3_checkConnect: 'Check your internet connection',
        ttBtn_NextPage: 'Next page',
        ttBtn_PreviousPage: 'Previous page',
        
        SECTEUR_11: "SETTINGS",
        h3_titleContactForm: 'Contact form',
        labelEmail: 'Your e-mail adress',
        objectEmail: 'Mail object',
        objects: 
        {
            bug: 'Report an issue',
            feedback: 'Provide feedback',
            other: 'Another reason'
        },
        labelMailArea: 'Enter your message here',
        sendMail: 'Send',
        mailDone: 'Email sent successfully',
        mailError: 'Error, e-mail not sent', 
        offlineError: 'You are offline',

        SECTEUR_12: 'CHECK-FIELD',
        requireMsg: 'Field is required',
        nameAlreadyExists: 'This name already exists',
        max50: 'Max 50 caracters',
        noNegativeNumber: 'No negative numbers',
        unknownCategory: 'Unknown category',
        isNotEmail: 'Please enter a valid e-mail address',

        SECTEUR_13: "Multi selections",
        selectedCount: 'items selected',
        textConfirmDeleteAll: 'Remove all selected ?'
    },



    {
        name: 'Français',
        flag: "/images/flag/fr.webp",

        SECTION_1: "EMPTY",
        noCatt: 'Aucune catégorie trouvée',
        noComp: 'Aucun composant trouvé',
        createFirstCatt: 'Créez la première',
        createFirstComp: 'Créez le premier',

        SECTION_2: "NAV-DRAWER",
        labelSearch: 'Recherche',
        tt_SearchBar: 'Barre de recherche',
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
        h3_selectMode: 'Selections multiples',
        ttBtn_Enable: 'Activer',
        ttBtn_Disable: 'Désactiver',
        h3_Backup: 'Sauvegarde',
        ctBtn_Settings: "Paramètres",
    
        SECTION_3: "CREATE-MENU",
        ttBtn_CreateCatt: 'Créer une catégorie',
        ctBtn_CreateCatt: 'Catégorie',
        ttBtn_CreateComp: 'Créer un composant',
        ctBtn_CreateComp: 'Composant',
    
        SECTION_4: "FORM-NEW-CP",
        ttBtn_AddLocalIcon: 'Ajouter une icône locale',
        ttBtn_DownLoadIcon: 'Télécharger une icône',
        ttBtn_RecentIcons: 'Icônes récentes',
        labelName: 'Nom',
        labelDescription: 'Description',
        labelQuantity: 'Quantité',
        labelCategory: 'Catégorie',
    
        SECTION_5: "BACKUP",
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
    
        SECTEUR_6: "COMPONENT",
        ttBtn_ShowDescription: 'Afficher la description',
        ctBtn_Close: 'Fermer',
        ttBtn_Minus: 'Moins',
        ttBtn_Plus: 'Plus',
        ttBtn_ExpandTrue: 'Afficher les détails',
        ttBtn_ExpandFalse: 'Masquer les détails',
    
        SECTEUR_7: 'CATEGORY',
        ttBtn_OpenCatt: 'Ouvrir la catégorie',
        textConfirmDelete: 'Supprimer cette catégorie ?',
        ctBtn_DeleteYes: 'Oui',
        ctBtn_DeleteNo: 'Non',
        textCattEmpty: 'La catégorie est vide',
            
        SECTEUR_8: "LITTLE-BTN",
        ttBtn_Set: 'Modifier',
        ttBtn_Delete: 'Supprimer',
        ttBtn_CreateCp: 'Créer un composant',
    
        SECTEUR_9: "BIG-BTN",
        ttBtn_Create: 'Nouveau',
        ttBtn_Menu: 'Menu',
        ttBtn_Done: 'Terminé',
        ttBtn_Cancel: 'Annuler',
        ttBtn_DeleteAll: 'Supprimer',
    
        SECTEUR_10: "FLATICON",
        ttBtnBack: 'Revenir en arrière',
        h1_NoResult: 'Aucun résultat',
        h1_Offline: 'Hors ligne',
        h1_ErrorJson: 'Erreur lors du chargement du fichier d\'icônes',
        h3_checkConnect: 'Vérifiez votre connexion internet',
        ttBtn_NextPage: 'Page suivante',
        ttBtn_PreviousPage: 'Page précédente',

        SECTEUR_11: "SETTINGS",
        h3_titleContactForm: 'Formulaire de contact',
        labelEmail: 'Votre adresse e-mail',
        objectEmail: 'Objet du courriel',
        objects:
        {
            bug: 'Signaler un problème',
            feedback: 'Retour d\'expérience',
            other: 'Autre raison'
        },
        labelMailArea: 'Saisissez votre message ici',
        sendMail: 'Envoyer',
        mailDone: 'E-mail envoyé avec succès',
        mailError: 'Erreur, l\'e-mail n\'a pas pu être envoyé',
        offlineError:'Vous êtes hors ligne',
  
        SECTEUR_12: 'CHECK-FIELD',
        requireMsg: 'Ce champ est requis',
        nameAlreadyExists: 'Ce nom existe déjà',
        max50: 'Maximum 50 caractères',
        noNegativeNumber: 'Pas de nombres négatifs autorisés',
        unknownCategory: 'Catégorie inconnue',
        isNotEmail: 'Veuillez saisir une adresse e-mail valide',

        SECTEUR_13: "Multi selections",
        selectedCount: 'éléments sélectionnés',
        textConfirmDeleteAll: 'Supprimer tous les éléments sélectionnés ?',       

    },
    {
        name: 'Italiano',
        flag: "/images/flag/it.webp",

        SECTION_1: "EMPTY",
        noCatt: 'Nessuna categoria trovata',
        noComp: 'Nessun componente trovato',
        createFirstCatt: 'Crea la tua prima',
        createFirstComp: 'Crea il tuo primo',

        SECTION_2: "NAV-DRAWER",
        labelSearch: 'Ricerca',
        tt_SearchBar: 'Barra di ricerca',
        h3_DisplayBtn: 'Visualizza',
        ttBtn_ShowCatt: 'Mostra Categoria',
        ttBtn_ShowComp: 'Mostra Componenti',
        ttBtn_DisplayGrid: 'Mostra griglia',
        ttBtn_DisplayRows: 'Mostra righe',
        h3_ShowIcons: 'Mostra',
        ttBtn_ShowIcons: 'Mostra Icone',
        ttBtn_HideIcons: 'Nascondi Icone',
        h3_Sort: 'Ordina per',
        ttBtn_SortLessRecent: 'Meno Recenti',
        ttBtn_SortMostRecent: 'Più Recenti',
        ttBtn_SortLittle: 'Pochi',
        ttBtn_SortMany: 'Molti',
        h3_selectMode: 'Selezioni multiple',
        ttBtn_Enable: 'Abilita',
        ttBtn_Disable: 'Disabilita',
        h3_Backup: 'Backup',
        ctBtn_Settings: "Impostazioni",

        SECTION_3: "CREATE-MENU",
        ttBtn_CreateCatt: 'Crea Categoria',
        ctBtn_CreateCatt: 'Categoria',
        ttBtn_CreateComp: 'Crea Componente',
        ctBtn_CreateComp: 'Componente',

        SECTION_4: "FORM-NEW-CP",
        ttBtn_AddLocalIcon: 'Aggiungi Icona Locale',
        ttBtn_DownLoadIcon: 'Scarica Icona',
        ttBtn_RecentIcons: 'Icone Recenti',
        labelName: 'Nome',
        labelDescription: 'Descrizione',
        labelQuantity: 'Quantità',
        labelCategory: 'Categoria',

        SECTION_5: "BACKUP",
        ctBtn_Save: 'Salva',
        ctBtn_Restore: 'Ripristina',
        ttBtn_GoBackup: 'Inizia Backup',
        ttBtn_RestoreBackup: 'Ripristina Backup',
        labelBackupFileInput: 'File di Backup',
        h3_warningBackup: 'ATTENZIONE! Qualsiasi dato non presente nel backup andrà perso!',
        h4_msgBackup: 'Per evitare ciò, modifica le opzioni qui sotto',
        ttBtn_StartBackup: 'Inizia Backup',
        ttBtn_CancelBackup: 'Annulla Backup',
        h2_BackupError: 'Errore di Backup',
        ttBtn_ShowErrorDetails: 'Mostra Dettagli Errore',
        ctBtn_ShowErrorDetails: 'Dettagli',

        SECTEUR_6: "COMPONENT",
        ttBtn_ShowDescription: 'Mostra Descrizione',
        ctBtn_Close: 'Chiudi',
        ttBtn_Minus: 'Meno',
        ttBtn_Plus: 'Più',
        ttBtn_ExpandTrue: 'Mostra Dettagli',
        ttBtn_ExpandFalse: 'Nascondi Dettagli',

        SECTEUR_7: 'CATEGORY',
        ttBtn_OpenCatt: 'Apri Categoria',
        textConfirmDelete: 'Eliminare questa Categoria?',
        ctBtn_DeleteYes: 'Sì',
        ctBtn_DeleteNo: 'No',
        textCattEmpty: 'Categoria Vuota',

        SECTEUR_8: "LITTLE-BTN",
        ttBtn_Set: 'Imposta',
        ttBtn_Delete: 'Elimina',
        ttBtn_CreateCp: 'Crea Componente',

        SECTEUR_9: "BIG-BTN",
        ttBtn_Create: 'Crea',
        ttBtn_Menu: 'Menu',
        ttBtn_Done: 'Fatto',
        ttBtn_Cancel: 'Annulla',
        ttBtn_DeleteAll: 'Rimuovere',

        SECTEUR_10: "FLATICON",
        ttBtnBack: 'Indietro',
        h1_NoResult: 'Nessun Risultato',
        h1_Offline: 'Offline',
        h1_ErrorJson: 'Errore durante il Caricamento del File delle Icone',
        h3_checkConnect: 'Verifica la Connessione Internet',
        ttBtn_NextPage: 'Pagina Successiva',
        ttBtn_PreviousPage: 'Pagina Precedente',

        SECTEUR_11: "SETTINGS",
        h3_titleContactForm: 'Modulo di contatto',
        labelEmail: 'Il tuo indirizzo e-mail',
        objectEmail: 'Oggetto della mail',
        objects:
        {
            bug: 'Segnala un problema',
            feedback: 'Fornisci un feedback',
            other: 'Altro motivo'
        },
        labelMailArea: 'Inserisci qui il tuo messaggio',
        sendMail: 'Invia',
        mailDone: 'Email inviata con successo',
        mailError: 'Errore, email non inviata',
        offlineError:'Sei offline',

        SECTEUR_12: 'CHECK-FIELD',
        requireMsg: 'Questo campo è obbligatorio',
        nameAlreadyExists: 'Questo nome esiste già',
        max50: 'Massimo 50 caratteri',
        noNegativeNumber: 'Nessun numero negativo consentito',
        unknownCategory: 'Categoria sconosciuta',
        isNotEmail: 'Inserisci un indirizzo e-mail valido',

        SECTEUR_13: "Multi selections",
        selectedCount: 'elementi selezionati',
        textConfirmDeleteAll: 'Rimuovere tutti gli elementi selezionati?',        
    },

    {
        name: 'Español',
        flag: "/images/flag/es.webp",

        SECTION_1: "EMPTY",
        noCatt: 'No se encontraron categorías',
        noComp: 'No se encontraron componentes',
        createFirstCatt: 'Crea tu primera',
        createFirstComp: 'Crea tu primera',

        SECTION_2: "NAV-DRAWER",
        labelSearch: 'Buscar',
        tt_SearchBar: 'Barra de búsqueda',
        h3_DisplayBtn: 'Mostrar',
        ttBtn_ShowCatt: 'Mostrar Categoría',
        ttBtn_ShowComp: 'Mostrar Componentes',
        ttBtn_DisplayGrid: 'Mostrar cuadrícula',
        ttBtn_DisplayRows: 'Mostrar filas',
        h3_ShowIcons: 'Mostrar',
        ttBtn_ShowIcons: 'Mostrar iconos',
        ttBtn_HideIcons: 'Ocultar iconos',
        h3_Sort: 'Ordenar por',
        ttBtn_SortLessRecent: 'Menos reciente',
        ttBtn_SortMostRecent: 'Más reciente',
        ttBtn_SortLittle: 'Poco',
        ttBtn_SortMany: 'Mucho',
        h3_selectMode: 'Selecciones mùltiples',
        ttBtn_Enable: 'Habilitar',
        ttBtn_Disable: 'Deshabilitar',        
        h3_Backup: 'Respaldo',
        ctBtn_Settings: "Configuración",

        SECTION_3: "CREATE-MENU",
        ttBtn_CreateCatt: 'Crear Categoría',
        ctBtn_CreateCatt: 'Categoría',
        ttBtn_CreateComp: 'Crear Componente',
        ctBtn_CreateComp: 'Componente',

        SECTION_4: "FORM-NEW-CP",
        ttBtn_AddLocalIcon: 'Agregar Icono Local',
        ttBtn_DownLoadIcon: 'Descargar Icono',
        ttBtn_RecentIcons: 'Iconos Recientes',
        labelName: 'Nombre',
        labelDescription: 'Descripción',
        labelQuantity: 'Cantidad',
        labelCategory: 'Categoría',

        SECTION_5: "BACKUP",
        ctBtn_Save: 'Guardar',
        ctBtn_Restore: 'Restaurar',
        ttBtn_GoBackup: 'Iniciar respaldo',
        ttBtn_RestoreBackup: 'Restaurar respaldo',
        labelBackupFileInput: 'Archivo de respaldo',
        h3_warningBackup: '¡ADVERTENCIA! ¡Cualquier dato no presente en el respaldo se perderá!',
        h4_msgBackup: 'Para evitar esto, cambia las opciones a continuación',
        ttBtn_StartBackup: 'Iniciar Respaldo',
        ttBtn_CancelBackup: 'Cancelar Respaldo',
        h2_BackupError: 'Error de respaldo',
        ttBtn_ShowErrorDetails: 'Mostrar detalles del error',
        ctBtn_ShowErrorDetails: 'Detalles',

        SECTEUR_6: "COMPONENTE",
        ttBtn_ShowDescription: 'Mostrar Descripción',
        ctBtn_Close: 'Cerrar',
        ttBtn_Minus: 'Menos',
        ttBtn_Plus: 'Más',
        ttBtn_ExpandTrue: 'Mostrar Detalles',
        ttBtn_ExpandFalse: 'Ocultar Detalles',

        SECTEUR_7: 'CATEGORÍA',
        ttBtn_OpenCatt: 'Abrir Categoría',
        textConfirmDelete: '¿Eliminar esta categoría?',
        ctBtn_DeleteYes: 'Sí',
        ctBtn_DeleteNo: 'No',
        textCattEmpty: 'La categoría está vacía',

        SECTEUR_8: "LITTLE-BTN",
        ttBtn_Set: 'Establecer',
        ttBtn_Delete: 'Eliminar',
        ttBtn_CreateCp: 'Crear componente',

        SECTEUR_9: "BIG-BTN",
        ttBtn_Create: 'Crear',
        ttBtn_Menu: 'Menú',
        ttBtn_Done: 'Listo',
        ttBtn_Cancel: 'Cancelar',
        ttBtn_DeleteAll: 'Eliminar',

        SECTEUR_10: "FLATICON",
        ttBtnBack: 'Volver',
        h1_NoResult: 'Sin resultados',
        h1_Offline: 'Sin conexión',
        h1_ErrorJson: 'Error al cargar el archivo de iconos',
        h3_checkConnect: 'Verifica tu conexión a internet',
        ttBtn_NextPage: 'Página siguiente',
        ttBtn_PreviousPage: 'Página anterior',

        SECTEUR_11: "SETTINGS",
        h3_titleContactForm: 'Formulario de contacto',
        labelEmail: 'Tu dirección de correo electrónico',
        objectEmail: 'Asunto del correo',
        objects:
        {
            bug: 'Informar un problema',
            feedback: 'Proporcionar comentarios',
            other: 'Otra razón'
        },
        labelMailArea: 'Ingresa tu mensaje aquí',
        sendMail: 'Enviar',
        mailDone: 'Correo electrónico enviado con éxito',
        mailError: 'Error, correo electrónico no enviado',
        offlineError:'Estás fuera de línea',

        SECTEUR_12: 'CHECK-FIELD',
        requireMsg: 'Este campo es obligatorio',
        nameAlreadyExists: 'Este nombre ya existe',
        max50: 'Máximo 50 caracteres',
        noNegativeNumber: 'No se permiten números negativos',
        unknownCategory: 'Categoría desconocida',
        isNotEmail: 'Por favor, ingresa una dirección de correo electrónico válida',

        SECTEUR_13: "Multi selections",
        selectedCount: 'elementos seleccionados',
        textConfirmDeleteAll: '¿Eliminar todos los elementos seleccionados?',        
    }
]



