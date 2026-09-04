'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import toast from 'react-hot-toast';
import type { TemplateCategory } from '@/types';

const CATEGORIES: TemplateCategory[] = [
  'Designer',
  'Développeur',
  'Photographe',
  'Entrepreneur',
  'Étudiant',
  'Créatif',
  'Agence',
];

interface TemplateForm {
  name: string;
  slug: string;
  description: string;
  category: TemplateCategory;
  thumbnail: string;
  preview: string;
  isPublished: boolean;
}

export default function AdminTemplatesPage() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<TemplateForm>({
    name: '',
    slug: '',
    description: '',
    category: 'Designer',
    thumbnail: '',
    preview: '',
    isPublished: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Template créé avec succès');
        setFormData({
          name: '',
          slug: '',
          description: '',
          category: 'Designer',
          thumbnail: '',
          preview: '',
          isPublished: false,
        });
        setShowForm(false);
      } else {
        toast.error('Erreur lors de la création du template');
      }
    } catch (error) {
      toast.error('Erreur lors de la création du template');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark">
        <div className="container py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h1 className="font-display text-4xl font-bold">Gestion des Templates</h1>
              <button
                onClick={() => setShowForm(!showForm)}
                className="btn-primary"
              >
                {showForm ? 'Annuler' : '+ Nouveau template'}
              </button>
            </div>

            {/* Form */}
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card space-y-4"
              >
                <h2 className="text-xl font-bold text-lime">Créer un nouveau template</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Nom</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="label">Slug</label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) =>
                          setFormData({ ...formData, slug: e.target.value })
                        }
                        className="input-field"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      className="input-field resize-none h-24"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Catégorie</label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            category: e.target.value as TemplateCategory,
                          })
                        }
                        className="input-field"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="label">URL Thumbnail</label>
                      <input
                        type="url"
                        value={formData.thumbnail}
                        onChange={(e) =>
                          setFormData({ ...formData, thumbnail: e.target.value })
                        }
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label">URL Preview</label>
                    <input
                      type="url"
                      value={formData.preview}
                      onChange={(e) =>
                        setFormData({ ...formData, preview: e.target.value })
                      }
                      className="input-field"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="published"
                      checked={formData.isPublished}
                      onChange={(e) =>
                        setFormData({ ...formData, isPublished: e.target.checked })
                      }
                      className="w-4 h-4"
                    />
                    <label htmlFor="published" className="label mb-0">
                      Publier immédiatement
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full"
                  >
                    {isLoading ? 'Création en cours...' : 'Créer le template'}
                  </button>
                </form>
              </motion.div>
            )}

            {/* Info */}
            <div className="card bg-lime/10 border-lime/50">
              <p className="text-lime">
                💡 Admin panel en construction. Les templates peuvent être ajoutés via l'API ou directement en base de données.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
