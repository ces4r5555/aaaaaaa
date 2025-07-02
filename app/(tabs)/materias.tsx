import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Search, ChevronRight, Clock, CircleCheck as CheckCircle, Circle, Filter, CreditCard as Edit3, Calendar, Eye, EyeOff, Trash2, Settings } from 'lucide-react-native';

interface Topic {
  id: string;
  name: string;
  studyTime: number; // minutes
  questionsTotal: number;
  questionsCorrect: number;
  difficulty: 'easy' | 'medium' | 'hard';
  studyRecords: StudyRecord[];
}

interface StudyRecord {
  id: string;
  date: Date;
  studyTime: number;
  questionsTotal: number;
  questionsCorrect: number;
}

interface Subject {
  id: string;
  name: string;
  importance: 'high' | 'medium' | 'low';
  topics: Topic[];
}

interface AccuracySettings {
  red: { min: number; max: number };
  yellow: { min: number; max: number };
  green: { min: number; max: number };
}

export default function MateriasScreen() {
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: '1',
      name: 'Direito Constitucional',
      importance: 'high',
      topics: [
        { 
          id: '1-1', 
          name: 'Princípios Fundamentais', 
          studyTime: 120, 
          questionsTotal: 50, 
          questionsCorrect: 42, 
          difficulty: 'medium',
          studyRecords: [
            { id: '1', date: new Date('2024-01-15'), studyTime: 60, questionsTotal: 25, questionsCorrect: 22 },
            { id: '2', date: new Date('2024-01-16'), studyTime: 60, questionsTotal: 25, questionsCorrect: 20 },
          ]
        },
        { 
          id: '1-2', 
          name: 'Direitos Fundamentais', 
          studyTime: 180, 
          questionsTotal: 75, 
          questionsCorrect: 68, 
          difficulty: 'hard',
          studyRecords: [
            { id: '3', date: new Date('2024-01-14'), studyTime: 90, questionsTotal: 40, questionsCorrect: 35 },
            { id: '4', date: new Date('2024-01-17'), studyTime: 90, questionsTotal: 35, questionsCorrect: 33 },
          ]
        },
        { 
          id: '1-3', 
          name: 'Organização do Estado', 
          studyTime: 90, 
          questionsTotal: 30, 
          questionsCorrect: 25, 
          difficulty: 'easy',
          studyRecords: [
            { id: '5', date: new Date('2024-01-18'), studyTime: 90, questionsTotal: 30, questionsCorrect: 25 },
          ]
        },
        { 
          id: '1-4', 
          name: 'Poder Executivo', 
          studyTime: 75, 
          questionsTotal: 25, 
          questionsCorrect: 20, 
          difficulty: 'medium',
          studyRecords: [
            { id: '6', date: new Date('2024-01-19'), studyTime: 75, questionsTotal: 25, questionsCorrect: 20 },
          ]
        },
        { 
          id: '1-5', 
          name: 'Poder Legislativo', 
          studyTime: 60, 
          questionsTotal: 20, 
          questionsCorrect: 18, 
          difficulty: 'easy',
          studyRecords: [
            { id: '7', date: new Date('2024-01-20'), studyTime: 60, questionsTotal: 20, questionsCorrect: 18 },
          ]
        },
        { 
          id: '1-6', 
          name: 'Poder Judiciário', 
          studyTime: 45, 
          questionsTotal: 15, 
          questionsCorrect: 12, 
          difficulty: 'hard',
          studyRecords: [
            { id: '8', date: new Date('2024-01-21'), studyTime: 45, questionsTotal: 15, questionsCorrect: 12 },
          ]
        },
      ]
    },
    {
      id: '2',
      name: 'Matemática',
      importance: 'high',
      topics: [
        { 
          id: '2-1', 
          name: 'Álgebra', 
          studyTime: 150, 
          questionsTotal: 40, 
          questionsCorrect: 30, 
          difficulty: 'medium',
          studyRecords: [
            { id: '9', date: new Date('2024-01-12'), studyTime: 75, questionsTotal: 20, questionsCorrect: 15 },
            { id: '10', date: new Date('2024-01-19'), studyTime: 75, questionsTotal: 20, questionsCorrect: 15 },
          ]
        },
        { 
          id: '2-2', 
          name: 'Geometria', 
          studyTime: 60, 
          questionsTotal: 20, 
          questionsCorrect: 15, 
          difficulty: 'hard',
          studyRecords: [
            { id: '11', date: new Date('2024-01-20'), studyTime: 60, questionsTotal: 20, questionsCorrect: 15 },
          ]
        },
        { 
          id: '2-3', 
          name: 'Estatística', 
          studyTime: 90, 
          questionsTotal: 30, 
          questionsCorrect: 22, 
          difficulty: 'medium',
          studyRecords: [
            { id: '12', date: new Date('2024-01-22'), studyTime: 90, questionsTotal: 30, questionsCorrect: 22 },
          ]
        },
        { 
          id: '2-4', 
          name: 'Probabilidade', 
          studyTime: 45, 
          questionsTotal: 15, 
          questionsCorrect: 10, 
          difficulty: 'hard',
          studyRecords: [
            { id: '13', date: new Date('2024-01-23'), studyTime: 45, questionsTotal: 15, questionsCorrect: 10 },
          ]
        },
      ]
    },
    {
      id: '3',
      name: 'Português',
      importance: 'medium',
      topics: [
        { 
          id: '3-1', 
          name: 'Sintaxe', 
          studyTime: 90, 
          questionsTotal: 35, 
          questionsCorrect: 28, 
          difficulty: 'medium',
          studyRecords: [
            { id: '14', date: new Date('2024-01-13'), studyTime: 45, questionsTotal: 18, questionsCorrect: 14 },
            { id: '15', date: new Date('2024-01-21'), studyTime: 45, questionsTotal: 17, questionsCorrect: 14 },
          ]
        },
        { 
          id: '3-2', 
          name: 'Semântica', 
          studyTime: 45, 
          questionsTotal: 15, 
          questionsCorrect: 10, 
          difficulty: 'easy',
          studyRecords: [
            { id: '16', date: new Date('2024-01-22'), studyTime: 45, questionsTotal: 15, questionsCorrect: 10 },
          ]
        },
        { 
          id: '3-3', 
          name: 'Morfologia', 
          studyTime: 60, 
          questionsTotal: 20, 
          questionsCorrect: 16, 
          difficulty: 'easy',
          studyRecords: [
            { id: '17', date: new Date('2024-01-24'), studyTime: 60, questionsTotal: 20, questionsCorrect: 16 },
          ]
        },
        { 
          id: '3-4', 
          name: 'Interpretação de Texto', 
          studyTime: 120, 
          questionsTotal: 40, 
          questionsCorrect: 35, 
          difficulty: 'medium',
          studyRecords: [
            { id: '18', date: new Date('2024-01-25'), studyTime: 120, questionsTotal: 40, questionsCorrect: 35 },
          ]
        },
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showStudyModal, setShowStudyModal] = useState(false);
  const [showEditSubjectModal, setShowEditSubjectModal] = useState(false);
  const [showEditTopicModal, setShowEditTopicModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [newSubjectText, setNewSubjectText] = useState('');
  const [colorFilter, setColorFilter] = useState<'all' | 'red' | 'yellow' | 'green'>('all');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<{ subjectId: string; topicId: string } | null>(null);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [editingTopic, setEditingTopic] = useState<{ subjectId: string; topic: Topic } | null>(null);
  const [showRecords, setShowRecords] = useState<{ [key: string]: boolean }>({});
  const [studyRecord, setStudyRecord] = useState({
    date: new Date().toISOString().split('T')[0],
    studyTime: 0,
    questionsTotal: 0,
    questionsCorrect: 0,
  });

  // Configurações de precisão personalizáveis
  const [accuracySettings, setAccuracySettings] = useState<AccuracySettings>({
    red: { min: 0, max: 70 },
    yellow: { min: 70, max: 80 },
    green: { min: 80, max: 100 },
  });

  const parseSubjectInput = (input: string) => {
    const subjects = input.split(';').map(s => s.trim()).filter(Boolean);
    return subjects.map(subject => {
      const [name, topicsStr] = subject.split(':');
      const topics = topicsStr ? topicsStr.split(',').map(t => t.trim()).filter(Boolean) : [];
      return { name: name.trim(), topics };
    });
  };

  const addSubjects = () => {
    if (!newSubjectText.trim()) return;

    try {
      const parsedSubjects = parseSubjectInput(newSubjectText);
      const newSubjects: Subject[] = parsedSubjects.map((parsed, index) => ({
        id: Date.now() + index + '',
        name: parsed.name,
        importance: 'medium' as const,
        topics: parsed.topics.map((topicName, topicIndex) => ({
          id: `${Date.now() + index}_${topicIndex}`,
          name: topicName,
          studyTime: 0,
          questionsTotal: 0,
          questionsCorrect: 0,
          difficulty: 'easy' as const,
          studyRecords: [],
        }))
      }));

      setSubjects(prev => [...prev, ...newSubjects]);
      setNewSubjectText('');
      setShowAddModal(false);
      Alert.alert('Sucesso', `${newSubjects.length} matéria(s) adicionada(s)!`);
    } catch (error) {
      Alert.alert('Erro', 'Formato inválido. Use: MATÉRIA:ASSUNTO,ASSUNTO;MATÉRIA...');
    }
  };

  const updateSubject = () => {
    if (!editingSubject) return;

    setSubjects(prev => prev.map(subject => 
      subject.id === editingSubject.id ? editingSubject : subject
    ));
    setEditingSubject(null);
    setShowEditSubjectModal(false);
    Alert.alert('Sucesso', 'Matéria atualizada!');
  };

  const deleteSubject = (subjectId: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir esta matéria e todos os seus tópicos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setSubjects(prev => prev.filter(s => s.id !== subjectId));
            Alert.alert('Sucesso', 'Matéria excluída!');
          },
        },
      ]
    );
  };

  const addTopicToSubject = (subjectId: string, topicName: string) => {
    if (!topicName.trim()) return;

    const newTopic: Topic = {
      id: Date.now().toString(),
      name: topicName,
      studyTime: 0,
      questionsTotal: 0,
      questionsCorrect: 0,
      difficulty: 'easy',
      studyRecords: [],
    };

    setSubjects(prev => prev.map(subject => 
      subject.id === subjectId 
        ? { ...subject, topics: [...subject.topics, newTopic] }
        : subject
    ));
  };

  const updateTopic = () => {
    if (!editingTopic) return;

    setSubjects(prev => prev.map(subject => {
      if (subject.id === editingTopic.subjectId) {
        return {
          ...subject,
          topics: subject.topics.map(topic => 
            topic.id === editingTopic.topic.id ? editingTopic.topic : topic
          )
        };
      }
      return subject;
    }));

    setEditingTopic(null);
    setShowEditTopicModal(false);
    Alert.alert('Sucesso', 'Tópico atualizado!');
  };

  const deleteTopic = (subjectId: string, topicId: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir este tópico?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            setSubjects(prev => prev.map(subject => 
              subject.id === subjectId 
                ? { ...subject, topics: subject.topics.filter(t => t.id !== topicId) }
                : subject
            ));
            Alert.alert('Sucesso', 'Tópico excluído!');
          },
        },
      ]
    );
  };

  const addStudyRecord = () => {
    if (!selectedTopic) return;

    const newRecord: StudyRecord = {
      id: Date.now().toString(),
      date: new Date(studyRecord.date),
      studyTime: studyRecord.studyTime,
      questionsTotal: studyRecord.questionsTotal,
      questionsCorrect: studyRecord.questionsCorrect,
    };

    setSubjects(prev => prev.map(subject => {
      if (subject.id === selectedTopic.subjectId) {
        return {
          ...subject,
          topics: subject.topics.map(topic => {
            if (topic.id === selectedTopic.topicId) {
              return {
                ...topic,
                studyTime: topic.studyTime + studyRecord.studyTime,
                questionsTotal: topic.questionsTotal + studyRecord.questionsTotal,
                questionsCorrect: topic.questionsCorrect + studyRecord.questionsCorrect,
                studyRecords: [...topic.studyRecords, newRecord],
              };
            }
            return topic;
          })
        };
      }
      return subject;
    }));

    setStudyRecord({
      date: new Date().toISOString().split('T')[0],
      studyTime: 0,
      questionsTotal: 0,
      questionsCorrect: 0,
    });
    setSelectedTopic(null);
    setShowStudyModal(false);
    Alert.alert('Sucesso', 'Registro de estudo adicionado!');
  };

  const getTopicColor = (topic: Topic) => {
    if (topic.questionsTotal === 0) return 'gray';
    const accuracy = (topic.questionsCorrect / topic.questionsTotal) * 100;
    
    if (accuracy >= accuracySettings.green.min && accuracy <= accuracySettings.green.max) return 'green';
    if (accuracy >= accuracySettings.yellow.min && accuracy < accuracySettings.yellow.max) return 'yellow';
    if (accuracy >= accuracySettings.red.min && accuracy < accuracySettings.red.max) return 'red';
    
    return 'gray';
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return '#e53e3e';
      case 'medium': return '#d69e2e';
      case 'low': return '#48bb78';
      default: return '#a0aec0';
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${Math.round(minutes)}min`;
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}min`;
  };

  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.topics.some(topic => topic.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (!matchesSearch) return false;
    
    if (colorFilter === 'all') return true;
    
    // Filtrar por cor baseado nos tópicos
    const hasTopicsWithColor = subject.topics.some(topic => {
      const topicColor = getTopicColor(topic);
      return topicColor === colorFilter;
    });
    
    return hasTopicsWithColor;
  });

  const toggleSubject = (subjectId: string) => {
    setExpandedSubjects(prev => 
      prev.includes(subjectId) 
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const openStudyModal = (subjectId: string, topicId: string) => {
    setSelectedTopic({ subjectId, topicId });
    setShowStudyModal(true);
  };

  const toggleRecords = (topicId: string) => {
    setShowRecords(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const saveAccuracySettings = () => {
    setShowSettingsModal(false);
    Alert.alert('Sucesso', 'Configurações de cores salvas!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Matérias & Tópicos</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => setShowSettingsModal(true)}
          >
            <Settings size={20} color="#a0aec0" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddModal(true)}
          >
            <Plus size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#a0aec0" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar matérias ou tópicos..."
            placeholderTextColor="#a0aec0"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>
        
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterButton, colorFilter === 'all' && styles.filterActive]}
            onPress={() => setColorFilter('all')}
          >
            <Text style={styles.filterText}>Todos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, styles.filterRed, colorFilter === 'red' && styles.filterActive]}
            onPress={() => setColorFilter('red')}
          >
            <Text style={styles.filterText}>🔴</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, styles.filterYellow, colorFilter === 'yellow' && styles.filterActive]}
            onPress={() => setColorFilter('yellow')}
          >
            <Text style={styles.filterText}>🟡</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, styles.filterGreen, colorFilter === 'green' && styles.filterActive]}
            onPress={() => setColorFilter('green')}
          >
            <Text style={styles.filterText}>🟢</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredSubjects.map((subject) => (
          <View key={subject.id} style={styles.subjectCard}>
            <TouchableOpacity
              style={styles.subjectHeader}
              onPress={() => toggleSubject(subject.id)}
            >
              <View style={styles.subjectInfo}>
                <Text style={styles.subjectName}>{subject.name}</Text>
                <View style={styles.subjectMeta}>
                  <View 
                    style={[
                      styles.importanceBadge, 
                      { backgroundColor: getImportanceColor(subject.importance) }
                    ]}
                  >
                    <Text style={styles.importanceText}>
                      {subject.importance === 'high' ? 'Alta' : 
                       subject.importance === 'medium' ? 'Média' : 'Baixa'}
                    </Text>
                  </View>
                  <Text style={styles.topicCount}>{subject.topics.length} tópicos</Text>
                </View>
              </View>
              <View style={styles.subjectActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => {
                    setEditingSubject(subject);
                    setShowEditSubjectModal(true);
                  }}
                >
                  <Edit3 size={16} color="#a0aec0" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => deleteSubject(subject.id)}
                >
                  <Trash2 size={16} color="#e53e3e" />
                </TouchableOpacity>
                <ChevronRight 
                  size={20} 
                  color="#a0aec0" 
                  style={[
                    styles.chevron,
                    expandedSubjects.includes(subject.id) && styles.chevronRotated
                  ]}
                />
              </View>
            </TouchableOpacity>

            {expandedSubjects.includes(subject.id) && (
              <View style={styles.topicsContainer}>
                {/* Horizontal Scrollable Topics */}
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={styles.topicsScrollView}
                  contentContainerStyle={styles.topicsScrollContent}
                >
                  {subject.topics
                    .filter(topic => 
                      searchTerm === '' || 
                      topic.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((topic) => {
                      const color = getTopicColor(topic);
                      const accuracy = topic.questionsTotal > 0 
                        ? (topic.questionsCorrect / topic.questionsTotal) * 100 
                        : 0;

                      return (
                        <View key={topic.id} style={styles.topicCard}>
                          <View style={styles.topicHeader}>
                            <View style={styles.topicInfo}>
                              <View 
                                style={[
                                  styles.colorIndicator,
                                  color === 'red' && styles.colorRed,
                                  color === 'yellow' && styles.colorYellow,
                                  color === 'green' && styles.colorGreen,
                                  color === 'gray' && styles.colorGray,
                                ]}
                              />
                              <Text style={styles.topicName} numberOfLines={2}>
                                {topic.name}
                              </Text>
                            </View>
                            <View style={styles.topicActions}>
                              <TouchableOpacity
                                style={styles.recordsToggleButton}
                                onPress={() => toggleRecords(topic.id)}
                              >
                                {showRecords[topic.id] ? (
                                  <EyeOff size={14} color="#a0aec0" />
                                ) : (
                                  <Eye size={14} color="#a0aec0" />
                                )}
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={styles.editTopicButton}
                                onPress={() => {
                                  setEditingTopic({ subjectId: subject.id, topic });
                                  setShowEditTopicModal(true);
                                }}
                              >
                                <Edit3 size={14} color="#a0aec0" />
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={styles.deleteTopicButton}
                                onPress={() => deleteTopic(subject.id, topic.id)}
                              >
                                <Trash2 size={14} color="#e53e3e" />
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={styles.addStudyButton}
                                onPress={() => openStudyModal(subject.id, topic.id)}
                              >
                                <Plus size={14} color="#48bb78" />
                              </TouchableOpacity>
                            </View>
                          </View>
                          
                          <View style={styles.topicStats}>
                            <View style={styles.statItem}>
                              <Clock size={12} color="#a0aec0" />
                              <Text style={styles.statText}>{formatTime(topic.studyTime)}</Text>
                            </View>
                            <View style={styles.statItem}>
                              <CheckCircle size={12} color="#48bb78" />
                              <Text style={styles.statText}>
                                {topic.questionsCorrect}/{topic.questionsTotal}
                              </Text>
                            </View>
                            <View style={styles.statItem}>
                              <Text style={styles.accuracyText}>
                                {accuracy.toFixed(0)}%
                              </Text>
                            </View>
                          </View>

                          {showRecords[topic.id] && topic.studyRecords.length > 0 && (
                            <View style={styles.recordsSection}>
                              <Text style={styles.recordsTitle}>Registros:</Text>
                              {topic.studyRecords.slice(-3).map((record) => (
                                <View key={record.id} style={styles.recordItem}>
                                  <Text style={styles.recordDate}>
                                    {record.date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                                  </Text>
                                  <Text style={styles.recordDetails}>
                                    {formatTime(record.studyTime)} • {record.questionsCorrect}/{record.questionsTotal}
                                  </Text>
                                </View>
                              ))}
                            </View>
                          )}
                        </View>
                      );
                    })}
                  
                  {/* Add Topic Button */}
                  <TouchableOpacity
                    style={styles.addTopicCard}
                    onPress={() => {
                      const topicName = prompt('Nome do novo tópico:');
                      if (topicName) {
                        addTopicToSubject(subject.id, topicName);
                      }
                    }}
                  >
                    <Plus size={20} color="#48bb78" />
                    <Text style={styles.addTopicText}>Novo Tópico</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Add Subject Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Matérias</Text>
            <Text style={styles.modalSubtitle}>
              Formato: MATÉRIA:ASSUNTO,ASSUNTO;MATÉRIA...
            </Text>
            <Text style={styles.modalExample}>
              Exemplo: Direito:Constitucional,Administrativo;Matemática:Álgebra,Geometria
            </Text>
            
            <TextInput
              style={styles.modalInput}
              multiline
              numberOfLines={4}
              placeholder="Digite as matérias e assuntos..."
              placeholderTextColor="#a0aec0"
              value={newSubjectText}
              onChangeText={setNewSubjectText}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.addModalButton]}
                onPress={addSubjects}
              >
                <Text style={styles.addButtonText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Subject Modal */}
      <Modal
        visible={showEditSubjectModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowEditSubjectModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Matéria</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nome da matéria</Text>
              <TextInput
                style={styles.modalInput}
                value={editingSubject?.name || ''}
                onChangeText={(text) => setEditingSubject(prev => prev ? { ...prev, name: text } : null)}
                placeholder="Nome da matéria"
                placeholderTextColor="#a0aec0"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Prioridade</Text>
              <View style={styles.priorityButtons}>
                {['high', 'medium', 'low'].map((priority) => (
                  <TouchableOpacity
                    key={priority}
                    style={[
                      styles.priorityButton,
                      editingSubject?.importance === priority && styles.priorityButtonActive,
                      priority === 'high' && styles.highPriority,
                      priority === 'medium' && styles.mediumPriority,
                      priority === 'low' && styles.lowPriority,
                    ]}
                    onPress={() => setEditingSubject(prev => prev ? { 
                      ...prev, 
                      importance: priority as 'high' | 'medium' | 'low' 
                    } : null)}
                  >
                    <Text style={styles.priorityButtonText}>
                      {priority === 'high' ? 'Alta' : priority === 'medium' ? 'Média' : 'Baixa'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowEditSubjectModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.addModalButton]}
                onPress={updateSubject}
              >
                <Text style={styles.addButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Topic Modal */}
      <Modal
        visible={showEditTopicModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowEditTopicModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Tópico</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nome do tópico</Text>
              <TextInput
                style={styles.modalInput}
                value={editingTopic?.topic.name || ''}
                onChangeText={(text) => setEditingTopic(prev => prev ? { 
                  ...prev, 
                  topic: { ...prev.topic, name: text } 
                } : null)}
                placeholder="Nome do tópico"
                placeholderTextColor="#a0aec0"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Dificuldade</Text>
              <View style={styles.priorityButtons}>
                {['easy', 'medium', 'hard'].map((difficulty) => (
                  <TouchableOpacity
                    key={difficulty}
                    style={[
                      styles.priorityButton,
                      editingTopic?.topic.difficulty === difficulty && styles.priorityButtonActive,
                      difficulty === 'easy' && styles.lowPriority,
                      difficulty === 'medium' && styles.mediumPriority,
                      difficulty === 'hard' && styles.highPriority,
                    ]}
                    onPress={() => setEditingTopic(prev => prev ? { 
                      ...prev, 
                      topic: { ...prev.topic, difficulty: difficulty as 'easy' | 'medium' | 'hard' } 
                    } : null)}
                  >
                    <Text style={styles.priorityButtonText}>
                      {difficulty === 'easy' ? 'Fácil' : difficulty === 'medium' ? 'Médio' : 'Difícil'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowEditTopicModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.addModalButton]}
                onPress={updateTopic}
              >
                <Text style={styles.addButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Study Record Modal */}
      <Modal
        visible={showStudyModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowStudyModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Registrar Estudo</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Data do estudo</Text>
              <TextInput
                style={styles.modalInput}
                value={studyRecord.date}
                onChangeText={(text) => setStudyRecord(prev => ({ ...prev, date: text }))}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#a0aec0"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Tempo estudado (minutos)</Text>
              <TextInput
                style={styles.modalInput}
                value={studyRecord.studyTime.toString()}
                onChangeText={(text) => setStudyRecord(prev => ({ ...prev, studyTime: parseInt(text) || 0 }))}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#a0aec0"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Questões resolvidas</Text>
              <TextInput
                style={styles.modalInput}
                value={studyRecord.questionsTotal.toString()}
                onChangeText={(text) => setStudyRecord(prev => ({ ...prev, questionsTotal: parseInt(text) || 0 }))}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#a0aec0"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Questões certas</Text>
              <TextInput
                style={styles.modalInput}
                value={studyRecord.questionsCorrect.toString()}
                onChangeText={(text) => setStudyRecord(prev => ({ ...prev, questionsCorrect: parseInt(text) || 0 }))}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#a0aec0"
              />
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowStudyModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.addModalButton]}
                onPress={addStudyRecord}
              >
                <Text style={styles.addButtonText}>Registrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Settings Modal */}
      <Modal
        visible={showSettingsModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSettingsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Configurações de Cores</Text>
            <Text style={styles.modalSubtitle}>
              Configure as faixas de porcentagem para cada cor
            </Text>
            
            <View style={styles.colorSettingsSection}>
              <View style={styles.colorSetting}>
                <View style={styles.colorHeader}>
                  <View style={[styles.colorDot, styles.colorRed]} />
                  <Text style={styles.colorLabel}>Vermelho (Baixo desempenho)</Text>
                </View>
                <View style={styles.rangeInputs}>
                  <TextInput
                    style={styles.rangeInput}
                    value={accuracySettings.red.min.toString()}
                    onChangeText={(text) => setAccuracySettings(prev => ({
                      ...prev,
                      red: { ...prev.red, min: parseInt(text) || 0 }
                    }))}
                    keyboardType="numeric"
                    placeholder="0"
                  />
                  <Text style={styles.rangeText}>até</Text>
                  <TextInput
                    style={styles.rangeInput}
                    value={accuracySettings.red.max.toString()}
                    onChangeText={(text) => setAccuracySettings(prev => ({
                      ...prev,
                      red: { ...prev.red, max: parseInt(text) || 70 }
                    }))}
                    keyboardType="numeric"
                    placeholder="70"
                  />
                  <Text style={styles.rangeText}>%</Text>
                </View>
              </View>

              <View style={styles.colorSetting}>
                <View style={styles.colorHeader}>
                  <View style={[styles.colorDot, styles.colorYellow]} />
                  <Text style={styles.colorLabel}>Amarelo (Médio desempenho)</Text>
                </View>
                <View style={styles.rangeInputs}>
                  <TextInput
                    style={styles.rangeInput}
                    value={accuracySettings.yellow.min.toString()}
                    onChangeText={(text) => setAccuracySettings(prev => ({
                      ...prev,
                      yellow: { ...prev.yellow, min: parseInt(text) || 70 }
                    }))}
                    keyboardType="numeric"
                    placeholder="70"
                  />
                  <Text style={styles.rangeText}>até</Text>
                  <TextInput
                    style={styles.rangeInput}
                    value={accuracySettings.yellow.max.toString()}
                    onChangeText={(text) => setAccuracySettings(prev => ({
                      ...prev,
                      yellow: { ...prev.yellow, max: parseInt(text) || 80 }
                    }))}
                    keyboardType="numeric"
                    placeholder="80"
                  />
                  <Text style={styles.rangeText}>%</Text>
                </View>
              </View>

              <View style={styles.colorSetting}>
                <View style={styles.colorHeader}>
                  <View style={[styles.colorDot, styles.colorGreen]} />
                  <Text style={styles.colorLabel}>Verde (Alto desempenho)</Text>
                </View>
                <View style={styles.rangeInputs}>
                  <TextInput
                    style={styles.rangeInput}
                    value={accuracySettings.green.min.toString()}
                    onChangeText={(text) => setAccuracySettings(prev => ({
                      ...prev,
                      green: { ...prev.green, min: parseInt(text) || 80 }
                    }))}
                    keyboardType="numeric"
                    placeholder="80"
                  />
                  <Text style={styles.rangeText}>até</Text>
                  <TextInput
                    style={styles.rangeInput}
                    value={accuracySettings.green.max.toString()}
                    onChangeText={(text) => setAccuracySettings(prev => ({
                      ...prev,
                      green: { ...prev.green, max: parseInt(text) || 100 }
                    }))}
                    keyboardType="numeric"
                    placeholder="100"
                  />
                  <Text style={styles.rangeText}>%</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowSettingsModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.addModalButton]}
                onPress={saveAccuracySettings}
              >
                <Text style={styles.addButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a202c',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  settingsButton: {
    backgroundColor: '#4a5568',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#48bb78',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d3748',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#ffffff',
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#2d3748',
    borderWidth: 1,
    borderColor: '#4a5568',
  },
  filterActive: {
    backgroundColor: '#48bb78',
    borderColor: '#48bb78',
  },
  filterRed: {
    backgroundColor: '#742a2a',
  },
  filterYellow: {
    backgroundColor: '#744210',
  },
  filterGreen: {
    backgroundColor: '#22543d',
  },
  filterText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  subjectCard: {
    backgroundColor: '#2d3748',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#4a5568',
  },
  subjectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subjectMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  importanceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  importanceText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  topicCount: {
    color: '#a0aec0',
    fontSize: 14,
  },
  subjectActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  chevron: {
    transform: [{ rotate: '0deg' }],
  },
  chevronRotated: {
    transform: [{ rotate: '90deg' }],
  },
  topicsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  topicsScrollView: {
    marginHorizontal: -8,
  },
  topicsScrollContent: {
    paddingHorizontal: 8,
    gap: 12,
  },
  topicCard: {
    backgroundColor: '#1a202c',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#4a5568',
    width: 200,
    minHeight: 140,
  },
  topicHeader: {
    marginBottom: 8,
  },
  topicInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  colorIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
    marginTop: 4,
  },
  colorRed: {
    backgroundColor: '#e53e3e',
  },
  colorYellow: {
    backgroundColor: '#d69e2e',
  },
  colorGreen: {
    backgroundColor: '#48bb78',
  },
  colorGray: {
    backgroundColor: '#a0aec0',
  },
  topicName: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    lineHeight: 18,
  },
  topicActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordsToggleButton: {
    padding: 2,
  },
  editTopicButton: {
    padding: 2,
  },
  deleteTopicButton: {
    padding: 2,
  },
  addStudyButton: {
    padding: 2,
  },
  topicStats: {
    gap: 6,
    marginBottom: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    color: '#a0aec0',
    fontSize: 11,
  },
  accuracyText: {
    color: '#48bb78',
    fontSize: 12,
    fontWeight: 'bold',
  },
  recordsSection: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#4a5568',
  },
  recordsTitle: {
    color: '#a0aec0',
    fontSize: 10,
    marginBottom: 6,
    fontWeight: 'bold',
  },
  recordItem: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: '#2d3748',
    borderRadius: 4,
    marginBottom: 2,
  },
  recordDate: {
    color: '#a0aec0',
    fontSize: 9,
    fontWeight: '600',
  },
  recordDetails: {
    color: '#e2e8f0',
    fontSize: 9,
  },
  addTopicCard: {
    backgroundColor: '#1a202c',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#48bb78',
    borderStyle: 'dashed',
    width: 120,
    minHeight: 140,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  addTopicText: {
    color: '#48bb78',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#2d3748',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#a0aec0',
    textAlign: 'center',
    marginBottom: 4,
  },
  modalExample: {
    fontSize: 12,
    color: '#48bb78',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  modalInput: {
    backgroundColor: '#1a202c',
    borderRadius: 12,
    padding: 16,
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  priorityButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  priorityButtonActive: {
    borderColor: '#48bb78',
  },
  highPriority: {
    backgroundColor: '#e53e3e',
  },
  mediumPriority: {
    backgroundColor: '#d69e2e',
  },
  lowPriority: {
    backgroundColor: '#48bb78',
  },
  priorityButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  colorSettingsSection: {
    marginBottom: 20,
  },
  colorSetting: {
    marginBottom: 20,
  },
  colorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  colorLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  rangeInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rangeInput: {
    backgroundColor: '#1a202c',
    borderRadius: 8,
    padding: 8,
    color: '#ffffff',
    fontSize: 14,
    width: 60,
    textAlign: 'center',
  },
  rangeText: {
    color: '#a0aec0',
    fontSize: 14,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#4a5568',
  },
  addModalButton: {
    backgroundColor: '#48bb78',
  },
  cancelButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});