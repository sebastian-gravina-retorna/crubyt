-- Backend: quien puede ver contactos también puede dar de baja suscriptores del newsletter.
drop policy if exists "newsletter_team_delete" on public.newsletter_subscribers;
create policy "newsletter_team_delete" on public.newsletter_subscribers
  for delete to authenticated using (public.can_view_contacts());
