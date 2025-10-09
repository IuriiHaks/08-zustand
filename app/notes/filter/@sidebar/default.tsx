import Link from 'next/link'
import css from './SidebarNotes.module.css'

const tags = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping']

export default function DefaultSidebar() {
  return (
    <aside>
      <nav>
        <ul>
          {tags.map((tag) => (
            <li key={tag}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
