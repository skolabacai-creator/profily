import { Project } from '../types';
import { projectsData as initialProjects } from './portfolioData';
import { supabase } from './supabaseClient';

// Social channel interface
export interface SocialChannel {
  id: string;
  name: string;
  username: string;
  link: string;
  type: 'whatsapp' | 'instagram' | 'behance' | 'twitter' | 'other';
}

const initialSocials: SocialChannel[] = [
  {
    id: 'soc1',
    name: 'واتسآب مباشر',
    username: '+963935122304',
    link: 'https://wa.me/963935122304',
    type: 'whatsapp'
  },
  {
    id: 'soc2',
    name: 'إنستغرام',
    username: 'ibrahim_al_abadi@',
    link: 'https://instagram.com/ibrahim_al_abadi',
    type: 'instagram'
  },
  {
    id: 'soc3',
    name: 'بيهانس للأعمال',
    username: 'behance.net/dbd59f78',
    link: 'https://behance.net/dbd59f78',
    type: 'behance'
  },
  {
    id: 'soc4',
    name: 'تويتر / X',
    username: 'M__ibrahim0@',
    link: 'https://twitter.com/M__ibrahim0',
    type: 'twitter'
  }
];

export const db = {
  // Load all projects
  async getProjects(): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      if (data && data.length > 0) return data;
      return initialProjects;
    } catch (e) {
      console.error('Error fetching projects from Supabase, using initial data:', e);
      return initialProjects;
    }
  },

  // Add project
  async addProject(project: Omit<Project, 'id'>): Promise<Project> {
    const newProject: Project = {
      ...project,
      id: `p_user_${Date.now()}`
    };

    try {
      const { error } = await supabase
        .from('projects')
        .insert([newProject]);

      if (error) throw error;
    } catch (e) {
      console.error('Error adding project to Supabase:', e);
      alert('🚨 فشل الاتصال بقاعدة البيانات السحابية. تم إرسال الطلب ولكن قد لا يُحفظ على الإنترنت.');
    }
    
    window.dispatchEvent(new Event('portfolio_db_update'));
    return newProject;
  },

  // Update project
  async updateProject(id: string, updatedFields: Partial<Project>): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updatedFields)
        .eq('id', id)
        .select();

      if (error) throw error;
      window.dispatchEvent(new Event('portfolio_db_update'));
      return data && data.length > 0 ? data[0] : null;
    } catch (e) {
      console.error('Error updating project in Supabase:', e);
      alert('🚨 فشل تعديل المشروع في قاعدة البيانات السحابية.');
      return null;
    }
  },

  // Delete project
  async deleteProject(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      window.dispatchEvent(new Event('portfolio_db_update'));
      return true;
    } catch (e) {
      console.error('Error deleting project in Supabase:', e);
      alert('🚨 فشل حذف المشروع من قاعدة البيانات السحابية.');
      return false;
    }
  },

  // Load all social channels
  async getSocials(): Promise<SocialChannel[]> {
    try {
      const { data, error } = await supabase
        .from('socials')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      if (data && data.length > 0) return data;
      return initialSocials;
    } catch (e) {
      console.error('Error fetching socials from Supabase, using initial data:', e);
      return initialSocials;
    }
  },

  // Update social channel
  async updateSocial(id: string, updatedFields: Partial<SocialChannel>): Promise<SocialChannel | null> {
    try {
      const { data, error } = await supabase
        .from('socials')
        .update(updatedFields)
        .eq('id', id)
        .select();

      if (error) throw error;
      window.dispatchEvent(new Event('portfolio_db_update'));
      return data && data.length > 0 ? data[0] : null;
    } catch (e) {
      console.error('Error updating social in Supabase:', e);
      alert('🚨 فشل تعديل قناة التواصل في قاعدة البيانات السحابية.');
      return null;
    }
  },

  // Reset database to initial values
  async resetToDefaults(): Promise<void> {
    try {
      // Clear tables
      await supabase.from('projects').delete().neq('id', '_none_');
      await supabase.from('socials').delete().neq('id', '_none_');

      // Insert defaults
      await supabase.from('socials').insert(initialSocials);
      await supabase.from('projects').insert(initialProjects);

      window.dispatchEvent(new Event('portfolio_db_update'));
    } catch (e) {
      console.error('Error resetting database in Supabase:', e);
      alert('🚨 فشل استعادة البيانات الافتراضية في قاعدة البيانات السحابية.');
    }
  }
};
