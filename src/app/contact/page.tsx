'use client';

import {
  Paper,
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  SimpleGrid,
  Container,
  Title,
  Box, // Thêm Box để bọc layout
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { ContactInfoItem } from '@/components/contact/ContactInfo';
import classes from '@/components/contact/contact.module.css';

// Import toàn bộ dữ liệu từ file content
import { contactInfo, formFields, pageContent } from '@/data/contact/data';

/**
 * Renders the Contact Page, including contact information and a contact form.
 */
export default function ContactPage() {
    // Tự động tạo initialValues và validation rules từ file dữ liệu
    // Automatically generates initial form values from the formFields data.
    const initialValues = formFields.reduce((acc, field) => {
        acc[field.name] = '';
        return acc;
    }, {} as Record<string, string>);

    // Automatically generates validation rules for the form fields.
    const validate = formFields.reduce((acc, field) => {
        if (field.required) {
            if (field.name === 'email') {
                acc[field.name] = (value: string) => !/^\S+@\S+$/.test(value);
            } else {
                acc[field.name] = (value: string) => value.trim().length === 0;
            }
        }
        return acc;
    }, {} as Record<string, (value: string) => boolean | null>);
    
    const form = useForm({ initialValues, validate });

  return (
    // Sử dụng Box để tạo layout flex column, đẩy footer xuống dưới
    <Box style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>    
      {/* Thêm style flex: 1 để nội dung tự dãn ra, đẩy footer xuống */}
      <Box style={{ flex: 1 }}>
        <Container size="lg" my="xl">
          <Paper shadow="md" radius="lg">
            <div className={classes.wrapper}>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
                {/* --- Phần thông tin (render từ dữ liệu) --- */}
                <div>
                  <Title order={2} className={classes.title}>
                    {pageContent.title}
                  </Title>
                  <Text className={classes.description} mt="sm" mb={30}>
                    {pageContent.description}
                  </Text>
                  {/* Dùng map để render */}
                  {contactInfo.map((item) => <ContactInfoItem key={item.title} {...item} />)}
                </div>

                {/* --- Phần Form (render từ dữ liệu) --- */}
                <form className={classes.form} onSubmit={form.onSubmit((values) => console.log(values))}>
                  <Title order={3} ta="center">{pageContent.formTitle}</Title>
                  
                  {/* Dùng map để render các trường của form */}
                  {formFields.map((field) => {
                    const commonProps = {
                      label: field.label,
                      placeholder: field.placeholder,
                      required: field.required,
                      mt: 'md',
                      ...form.getInputProps(field.name),
                    };

                    if (field.component === 'Textarea') {
                      return <Textarea key={field.name} minRows={4} {...commonProps} />;
                    }
                    
                    return <TextInput key={field.name} {...commonProps} />;
                  })}

                  <Group justify="flex-end" mt="md">
                    <Button type="submit" className={classes.control}>
                      {pageContent.submitButton}
                    </Button>
                  </Group>
                </form>
              </SimpleGrid>
            </div>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}