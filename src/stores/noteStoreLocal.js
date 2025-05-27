import sourceNotes from '../../tests_data/note.json'
import categories from '../../tests_data/category.json'
import tags from '../../tests_data/tag.json'
import aboutMeList from '../../tests_data/about_me.json'
import friends from '../../tests_data/friend_link.json'

sourceNotes.sort((a, b) => b.create_time - a.create_time)

const notes = sourceNotes.map(note => ({
    ...note,
    create_time: new Date(note.create_time * 1000).toLocaleString(),
    update_time: note.update_time ? new Date(note.update_time * 1000).toLocaleString() : null
}))

export {
    notes,
    categories,
    tags,
    aboutMeList,
    friends
}
