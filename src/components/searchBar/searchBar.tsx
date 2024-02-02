import "./styles.styl";
function SearchBar({ onHandleSubmit, onChangeValue }) {
  return (
    <>
      <div className="search-bar-container">
        <form onSubmit={onHandleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Que pokemon buscas..."
            onChange={onChangeValue}
          />
        </form>
      </div>
    </>
  );
}

export default SearchBar;
