export default () => {
	return (
		<div>
			<h1>About Us</h1>
			<p>
				We sell products to Swifties. No app is complete without at least one
				Taylor Swift joke.
			</p>

			<button
				type="button"
				onClick={(evt) => {
					window.history.back()
					evt.preventDefault()
				}}
			>
				Back
			</button>
		</div>
	)
}
